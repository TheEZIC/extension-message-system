import { IMessageContent, ISentMessageContent } from "../contents";
import { isISentMessage } from "../guards";

export default abstract class SendableMessage<Payload, Response = void> {
  private readonly _content: ISentMessageContent<Payload>;

  protected get content(): ISentMessageContent<Payload> {
    return this._content;
  }

  private readonly _hash: string;

  protected get hash(): string {
    return this._hash;
  }

  constructor(message: IMessageContent<Payload>) {
    this._hash = !isISentMessage(message)
      ? this.generateHash()
      : message.hash;

    this._content = {
      ...message,
      hash: this.hash,
    };
  }

  public setTabs(tabs: number[] | undefined) {
    this._content.tabs = tabs;
  }

  public setSendToCurrent(flag: boolean) {
    this._content.sendToCurrent = flag;
  }

  private generateHash() {
    return Date.now().toString(36);
  }

  public abstract send(): Response | Promise<Response>;
}
