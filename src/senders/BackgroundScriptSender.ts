import browser from "webextension-polyfill";
import { IMessageContent } from "../messages";
import { ISender } from "../types/ISender";

export default class BackgroundScriptSender<Request extends IMessageContent> implements ISender<Request> {
  public send(message: Request): void {
    browser.runtime.sendMessage(message);
  }
}
