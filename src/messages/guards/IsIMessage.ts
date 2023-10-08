import { IMessageContent } from "../contents/IMessageContent";

export const isIMessage = (obj: any): obj is IMessageContent => {
  return obj.to && obj.from && !obj.hash;
}
