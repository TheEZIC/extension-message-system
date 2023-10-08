import browser from "webextension-polyfill";
import SendableMessage from "./SendableMessage";
import SenderFactory from "../../SenderFactory";
import { ISentMessageContent } from "../contents";

export default class ReplyableMessage<Payload = any, Response = void> extends SendableMessage<Payload, Response> {
  private _timeout: number = Infinity;

  private get timeout(): number {
    return this._timeout;
  }

  public setTimeout(value?: number): this {
    this._timeout = value ? value : Infinity;
    return this;
  }

  public send(): Promise<Response> {
    return new Promise<Response>((resolve, reject) => {
      const haveTimeout = !Number.isFinite(this.timeout);
      let timeout: ReturnType<typeof setTimeout>;

      if (haveTimeout) {
        let t = setTimeout(() => {
          reject(new Error("Out of timeout"));
          clearTimeout(t);
        }, this.timeout);
      }

      const callback = (message: ISentMessageContent<Response>) => {
        if (
          message.isResponse
          && message.commandName === this.content.commandName
          && message.hash === this.content.hash
        ) {
          if (haveTimeout && timeout) {
            clearTimeout(timeout);
          }

          browser.runtime.onMessage.removeListener(callback);
          resolve(message.payload as Response);
        }
      }

      browser.runtime.onMessage.addListener(callback);

      const sender = SenderFactory.getSender(this.content.to);
      sender.send(this.content);
    });
  }
}
