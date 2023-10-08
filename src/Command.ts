import { ISentMessageContent } from "./messages";
import { ICommandOptions } from "./types/ICommandOptions";
import { ICommand } from "./types/ICommand";

export default abstract class Command implements ICommand, ICommandOptions {
  public abstract readonly name: string;

  public readonly removable: boolean = true;

  public abstract run(request: ISentMessageContent): any;

  public static create(command: ICommand, options?: ICommandOptions) {
    return new class extends Command {
      public readonly name: string = command.name;
      public readonly removable: boolean = options?.removable ?? false;

      public run(message: ISentMessageContent): any {
        return command.run(message);
      }
    }
  }
}
