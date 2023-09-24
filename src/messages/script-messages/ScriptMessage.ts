import { IMessage, ScriptType } from "../../types";
import RespondableMessage from "../messages/RespondableMessage";
import NormalMessage from "../messages/NormalMessage";
import AbstractMessage from "../messages/AbstractMessage";

export default abstract class ScriptMessage<Payload = any, Response = void> {
  protected abstract readonly from: ScriptType;
  private _to: ScriptType;

  private _command: string;
  private _await: boolean = false;
  private _timeout?: number;

  constructor(
    command: string,
    private _payload?: Payload,
  ) {
    this._command = command;
  }

  public payload(payload: Payload): ScriptMessage<Payload, Response> {
    this._payload = payload;

    return this;
  }

  public to(script: ScriptType): ScriptMessage<Payload, Response> {
    this._to = script;

    return this;
  }

  public await(flag: boolean): ScriptMessage<Payload, Response> {
    this._await = flag;

    return this;
  }

  public timeout(timeout: number): ScriptMessage<Payload, Response> {
    this._timeout = timeout;

    return this;
  }

  protected buildMessage(): AbstractMessage<Payload, Response> {
    if (!this._to) {
      throw new Error("Please use to() method to specify to which script you need to send message");
    }

    const data: IMessage = {
      commandName: this._command,
      payload: this._payload,
      from: this.from,
      to: this._to,
    };

    if (this._await) {
      const message = new RespondableMessage<Payload, Response>(data);
      message.setTimeout(this._timeout);

      return message;
    } else {
      const message = new NormalMessage<Payload>(data);

      return message as AbstractMessage<Payload, Response>;
    }
  }

  public async send(): Promise<Response> {
    const message = this.buildMessage();

    return message.send() as Response;
  }
}
