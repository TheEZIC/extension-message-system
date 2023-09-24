import ContentScriptSender from "./senders/ContentScriptSender";
import { ISender } from "./types/ISender";
import BackgroundScriptSender from "./senders/BackgroundScriptSender";
import PopupScriptSender from "./senders/PopupScriptSender";
import { ScriptType } from "./types";

export default class SenderFactory {
  public static getSender(scriptType: ScriptType): ISender {
    switch (scriptType) {
      case "background":
        return new BackgroundScriptSender();
      case "content":
        return new ContentScriptSender();
      case "popup":
        return new PopupScriptSender();
    }
  }
}
