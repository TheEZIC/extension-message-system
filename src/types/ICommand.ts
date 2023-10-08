import { ISentMessageContent } from "../messages";

export interface ICommand {
  name: string;
  run: (message: ISentMessageContent) => any;
}
