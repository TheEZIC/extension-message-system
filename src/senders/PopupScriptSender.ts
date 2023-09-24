import browser from "webextension-polyfill";
import { IMessage } from "../types";
import { ISender } from "../types/ISender";

export default class PopupScriptSender<Request extends IMessage> implements ISender<Request> {
  public send(message: Request): void {
    browser.runtime.sendMessage(message);
  }
}
