import ReplyableMessage from "../sendable-messages/ReplyableMessage";
import UnreplyableMessage from "../sendable-messages/UnreplyableMessage";
import SendableMessage from "../sendable-messages/SendableMessage";
import { ScriptType } from "../../types";
import { IMessageContent } from "../contents";

export default abstract class ScriptMessage<Payload = any, Response = void> {
  protected abstract readonly from: ScriptType

  private _command: string;

  public command(command: string): ScriptMessage<Payload, Response> {
    this._command = command;

    return this;
  }

  private _payload?: Payload;

  public payload(payload: Payload): ScriptMessage<Payload, Response> {
    this._payload = payload;

    return this;
  }

  private _to: ScriptType;

  public to(script: ScriptType): ScriptMessage<Payload, Response> {
    this._to = script;

    return this;
  }

  private _await: boolean = false;

  public await(flag: boolean): ScriptMessage<Payload, Response> {
    this._await = flag;

    return this;
  }

  private _timeout?: number;

  public timeout(timeout: number): ScriptMessage<Payload, Response> {
    this._timeout = timeout;

    return this;
  }

  protected buildMessage(): SendableMessage<Payload, Response> {
    if (!this._command) {
      throw new Error("Please use command() method to specify which command you'd like to call");
    }

    if (!this._to) {
      throw new Error("Please use to() method to specify to which script you need to send message");
    }

    const data: IMessageContent = {
      commandName: this._command,
      payload: this._payload,
      from: this.from,
      to: this._to,
    };

    if (this._await) {
      const message = new ReplyableMessage<Payload, Response>(data);
      message.setTimeout(this._timeout);

      return message;
    } else {
      const message = new UnreplyableMessage<Payload>(data);

      return message as SendableMessage<Payload, Response>;
    }
  }

  public async send(): Promise<Response> {
    const message = this.buildMessage();

    return message.send() as Response;
  }
}
