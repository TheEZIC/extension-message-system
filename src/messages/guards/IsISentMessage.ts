import { ISentMessageContent } from "../contents/ISentMessageContent";

export const isISentMessage = (obj: any): obj is ISentMessageContent => {
  return obj.to && obj.from && obj.hash;
}
