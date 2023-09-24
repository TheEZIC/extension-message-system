import browser, { Tabs } from "webextension-polyfill";
import { IMessage } from "../types";
import { ISender } from "../types/ISender";
import Tab = chrome.tabs.Tab;

export default class ContentScriptSender<Request extends IMessage> implements ISender<Request> {
  public async send(message: Request): Promise<void> {
    let tab: Tabs.Tab | Tab;

    if (message.from === "content") {
      return;
    }

    // @ts-ignore
    browser.tabs.sendMessage(tab.id!, message);
  }
}
