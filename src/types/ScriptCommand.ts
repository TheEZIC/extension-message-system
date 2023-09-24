import Command from "../Command";
import { ISentMessage } from "./messages";

export type FunctionalCommand = (message: ISentMessage) => any;
export type ScriptCommand = Command | FunctionalCommand;
