import { Tabs } from "webextension-polyfill";
import Tab = chrome.tabs.Tab;

export default class TabManager {
  private static _activeTab: Tab | Tabs.Tab;
  private static _currentActiveTab: Tab | Tabs.Tab;

  public static get activeTab(): Tab | Tabs.Tab {
    return this._activeTab;
  }

  public static set activeTab(tab: Tab | Tabs.Tab) {
    this._currentActiveTab = tab;
  }

  public static addTask() {

  }

  public static removeTask() {

  }
}
