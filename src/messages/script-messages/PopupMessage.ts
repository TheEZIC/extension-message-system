import ScriptMessage from "./ScriptMessage";
import { ScriptType } from "../../types";

export class PopupMessage<Payload = any, Response = void> extends ScriptMessage<Payload, Response> {
  protected readonly from: ScriptType = "popup";
}
