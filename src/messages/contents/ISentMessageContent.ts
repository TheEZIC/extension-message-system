import { IMessageContent } from "./IMessageContent";

export interface ISentMessageContent<Payload = any> extends IMessageContent<Payload> {
  hash: string;
  isResponse?: boolean;
}
