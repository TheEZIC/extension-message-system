import browser from "webextension-polyfill";
import { IMessageContent, PopupMessage } from "../messages";
import { ISender } from "../types/ISender";
import Tab = chrome.tabs.Tab;
import TabManager from "../TabManager";

export default class ContentScriptSender<Request extends IMessageContent> implements ISender<Request> {
  public async send(message: Request): Promise<void> {
    if (message.from === "content") {
      throw new Error("You can't send message from content script to content script");
    }

    let tabIds: Set<number> = new Set();

    if (message.tabs) {
      for (const tab of message.tabs) {
        tabIds.add(tab);
      }
    }

    if (message.sendToCurrent) {
      const activeTabId = await this.getActiveTabId(message);

      tabIds.add(activeTabId);
    }


    this.sendToTabs(message, Array.from(tabIds));
  }

  private async getActiveTabId(message: Request): Promise<number> {
    switch (message.from) {
      case "background":
        return TabManager.instance.activeTab.id!;
      case "popup":
        const tab = await new PopupMessage<void, Tab>()
          .command("getActiveTab")
          .to("background")
          .await(true)
          .send();

        return tab.id!;
      case "content":
        throw new Error("You can't send message from content script to content script");
    }
  }

  private sendToTabs(message: Request, tabIds: number[]) {
    for (const tabId of tabIds) {
      browser.tabs.sendMessage(tabId, message);
    }
  }
}
