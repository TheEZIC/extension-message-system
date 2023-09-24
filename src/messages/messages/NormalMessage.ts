import AbstractMessage from "./AbstractMessage";
import SenderFactory from "../../SenderFactory";

export default class NormalMessage<Request = any> extends AbstractMessage<Request> {
  public send(): void {
    const sender = SenderFactory.getSender(this.message.to);
    sender.send(this.message);
  }
}
