import Command from "../Command";
import { ISentMessageContent } from "../messages";
import TabManager from "../TabManager";

export default class GetActiveTabCommand extends Command {
  public readonly name: string = "getActiveTab";
  
  public readonly removable: boolean = false;

  public run(request: ISentMessageContent): any {
    return TabManager.instance.activeTab;
  }
}
