import SendableMessage from "./SendableMessage";
import SenderFactory from "../../SenderFactory";

export default class UnreplyableMessage<Request = any> extends SendableMessage<Request> {
  public send(): void {
    const sender = SenderFactory.getSender(this.content.to);
    sender.send(this.content);
  }
}
