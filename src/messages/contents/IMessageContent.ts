import { IBaseMessageContent } from "./IBaseMessageContent";
import { ScriptType } from "../../types/ScriptType";

export interface IMessageContent<Payload = any> extends IBaseMessageContent<Payload> {
  from: ScriptType;
  to: ScriptType;
}
