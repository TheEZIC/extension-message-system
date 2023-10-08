import browser from "webextension-polyfill";
import Command from "./Command";
import UnreplyableMessage from "./messages/sendable-messages/UnreplyableMessage";
import TabManager from "./TabManager";
import { FunctionalCommand } from "./types/ScriptCommand";
import { ScriptType } from "./types";
import { ISentMessageContent } from "./messages";
import { ICommand } from "./types/ICommand";
import { ICommandOptions } from "./types/ICommandOptions";
import GetActiveTabCommand from "./system-commands/GetActiveTabCommand";

export default class MessageSystem {
  private _commands: Command[];

  constructor(
    private readonly scriptType: ScriptType,
  ) {
    this.registerSystemCommands();
    this.runScriptBasedSideEffects();
  }

  public startListening(): void {
    browser.runtime.onMessage.addListener(this.onMessage);
  }

  public stopListening(): void {
    browser.runtime.onMessage.removeListener(this.onMessage);
  }

  private async onMessage(message: ISentMessageContent) {
    const existedCommand = this.findCommand(message.commandName);

    if (existedCommand) {
      const result = await existedCommand.run(message);
      this.sendResponse(message, result);
    }
  }

  private sendResponse(message: ISentMessageContent, response: any) {
    const responseMessage: ISentMessageContent = {
      commandName: message.commandName,
      isResponse: true,
      hash: message.hash,
      from: message.to,
      to: message.from,
      payload: response,
    };

    new UnreplyableMessage(responseMessage).send();
  }

  public findCommand(command: string): ICommand | undefined {
    return this._commands.find(c => c.name === command);
  }

  public registerCommand(command: string, cb: FunctionalCommand, options?: ICommandOptions): MessageSystem;
  public registerCommand(command: Command | Array<Command>): MessageSystem;

  public registerCommand(
    command: Command | Array<Command> | string,
    cb?: FunctionalCommand,
    options?: ICommandOptions
  ): MessageSystem {
    if (typeof command === "string") {
      if (typeof cb === "undefined") {
        return this;
      }

      const cmd: Command = Command.create({
        name: command,
        run: cb,
      }, options);

      this._commands.push(cmd);
    } else {
      if (Array.isArray(command)) {
        this._commands.push(...command);
      } else {
        this._commands.push(command);
      }
    }

    return this;
  }

  public deregisterCommand(name: string): MessageSystem {
    this._commands = this._commands.filter(
      (c) => c.name !== name || c.removable
    );

    return this;
  }

  private registerSystemCommands() {
    switch (this.scriptType) {
      case "background":
        this.registerBackgroundScriptSystemCommands();
        break;
    }
  }

  private registerBackgroundScriptSystemCommands() {
    const commands: Command[] = [
      new GetActiveTabCommand(),
    ];

    this.registerCommand(commands);
  }

  private runScriptBasedSideEffects() {
    switch (this.scriptType) {
      case "background":
        TabManager.instance.listenActiveTabChange();
        break;
    }
  }
}
