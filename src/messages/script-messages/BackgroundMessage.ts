import ScriptMessage from "./ScriptMessage";
import { ScriptType } from "../../types";

export class BackgroundMessage<Payload = any, Response = void> extends ScriptMessage<Payload, Response> {
  protected readonly from: ScriptType = "background";
}
