import { IMessage } from "../messages/IMessage";

export const isIMessage = (obj: any): obj is IMessage => {
  return obj.to && obj.from && !obj.hash;
}
