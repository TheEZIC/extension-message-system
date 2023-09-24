import { ISentMessage } from "./types";

export default abstract class Command {
  public abstract readonly commandName: string;

  public abstract run(request: ISentMessage): any;
}
