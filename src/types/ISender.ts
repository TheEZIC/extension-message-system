import { IMessageContent } from "../messages";

export interface ISender<Request extends IMessageContent = any> {
  send: (message: Request) => void | Promise<void>;
}
