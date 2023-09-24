import { IMessage, ISentMessage, isISentMessage } from "../../types";

export default abstract class AbstractMessage<Payload, Response = void> {
  private readonly _message: ISentMessage<Payload>;

  protected get message(): ISentMessage<Payload> {
    return this._message;
  }

  private readonly _hash: string;

  protected get hash(): string {
    return this._hash;
  }

  constructor(message: IMessage<Payload> | ISentMessage<Payload>) {
    this._hash = !isISentMessage(message)
      ? this.generateHash()
      : message.hash;

    this._message = {
      ...message,
      hash: this.hash,
    };
  }

  public setTabs(tabs: number[] | undefined) {
    this._message.tabs = tabs;
  }

  private generateHash() {
    return Date.now().toString(36);
  }

  public abstract send(): Response | Promise<Response>;
}
