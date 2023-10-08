import Command from "../Command";
import { ISentMessageContent } from "../messages/contents";

export type FunctionalCommand = (message: ISentMessageContent) => any;
export type ScriptCommand = Command | FunctionalCommand;
