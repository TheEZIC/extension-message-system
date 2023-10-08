import browser from "webextension-polyfill";
import { IMessageContent } from "../messages";
import { ISender } from "../types/ISender";

export default class PopupScriptSender<Request extends IMessageContent> implements ISender<Request> {
  public send(message: Request): void {
    browser.runtime.sendMessage(message);
  }
}
