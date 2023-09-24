import ScriptMessage from "./ScriptMessage";
import { ScriptType } from "../../types";

export class ContentMessage<Payload = any, Response = void> extends ScriptMessage<Payload, Response> {
  protected readonly from: ScriptType = "content";

  private _tabs: Set<number> = new Set<number>();

  public addTab(tabId: number): ContentMessage<Payload, Response> {
    this._tabs.add(tabId);

    return this;
  }

  public removeTab(tabId: number): ContentMessage<Payload, Response> {
    this._tabs.delete(tabId);

    return this;
  }

  protected buildMessage() {
    const message = super.buildMessage();
    message.setTabs(Array.from(this._tabs));

    return message;
  }
}
