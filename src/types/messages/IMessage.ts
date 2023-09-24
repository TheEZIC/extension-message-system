import {IBaseMessage} from "./IBaseMessage";
import {ScriptType} from "../ScriptType";

export interface IMessage<Payload = any> extends IBaseMessage<Payload> {
  from: ScriptType;
  to: ScriptType;
}
