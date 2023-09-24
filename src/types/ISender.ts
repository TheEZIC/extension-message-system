import { IMessage } from "./index";

export interface ISender<Request extends IMessage = any> {
  send: (message: Request) => void | Promise<void>;
}
