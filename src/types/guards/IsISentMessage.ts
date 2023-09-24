import { ISentMessage } from "../messages/ISentMessage";

export const isISentMessage = (obj: any): obj is ISentMessage => {
  return obj.to && obj.from && obj.hash;
}
