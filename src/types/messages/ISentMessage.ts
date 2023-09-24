import {IMessage} from "./IMessage";

export interface ISentMessage<Payload = any> extends IMessage<Payload> {
  hash: string;
  isResponse?: boolean;
}
