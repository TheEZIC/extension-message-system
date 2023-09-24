import browser from "webextension-polyfill";
import AbstractMessage from "./AbstractMessage";
import SenderFactory from "../../SenderFactory";
import { ISentMessage } from "../../types";

export default class RespondableMessage<Payload = any, Response = void> extends AbstractMessage<Payload, Response> {
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
      let haveTimeout = !Number.isFinite(this.timeout);
      let timeout: ReturnType<typeof setTimeout>;

      if (haveTimeout) {
        let t = setTimeout(() => {
          reject(new Error("Out of timeout"));
          clearTimeout(t);
        }, this.timeout);
      }

      const callback = (message: ISentMessage<Response>) => {
        if (
          message.isResponse
          && message.commandName === this.message.commandName
          && message.hash === this.message.hash
        ) {
          if (haveTimeout && timeout) {
            clearTimeout(timeout);
          }

          browser.runtime.onMessage.removeListener(callback);
          resolve(message.payload as Response);
        }
      }

      browser.runtime.onMessage.addListener(callback);

      const sender = SenderFactory.getSender(this.message.to);
      sender.send(this.message);
    });
  }
}
