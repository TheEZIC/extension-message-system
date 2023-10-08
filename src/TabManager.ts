import browser, { Tabs } from "webextension-polyfill";
import Tab = chrome.tabs.Tab;

export default class TabManager {
  private _activeTab: Tab | Tabs.Tab;
  private _currentActiveTab: Tab | Tabs.Tab;

  private static _instance: TabManager;

  public static get instance() {
    if (!this._instance) {
      this._instance = new TabManager();
    }

    return this._instance;
  }

  public get activeTab(): Tab | Tabs.Tab {
    return this._activeTab;
  }

  public set activeTab(tab: Tab | Tabs.Tab) {
    this._currentActiveTab = tab;
  }

  public listenActiveTabChange() {
    browser.tabs.onActivated.addListener(async (activeInfo) => {
      const tab = await browser.tabs.get(activeInfo.tabId);

      this.activeTab = tab;
    });
  }
}
