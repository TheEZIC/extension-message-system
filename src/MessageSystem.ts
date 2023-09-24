import browser from "webextension-polyfill";
import Command from "./Command";
import { ISentMessage, ScriptType } from "./types";
import NormalMessage from "./messages/messages/NormalMessage";
import TabManager from "./TabManager";
import { FunctionalCommand } from "./types/ScriptCommand";

export default class MessageSystem {
  private _commands: Command[];

  constructor(
    private readonly scriptType: ScriptType,
    commands?: Command[],
  ) {
    this._commands = commands ?? [];

    if (scriptType === "background") {
      this.listenActiveTabChange();
    }
  }

  private async onMessage(message: ISentMessage) {
    const existed = this.findCommand(message.commandName);

    if (existed) {
      const result = await existed.run(message);
      this.sendResponse(message, result);
    }
  }

  public start(): void {
    browser.runtime.onMessage.addListener(this.onMessage);
  }

  public stop(): void {
    browser.runtime.onMessage.removeListener(this.onMessage);
  }

  private sendResponse(message: ISentMessage, response: any) {
    const responseMessage: ISentMessage = {
      commandName: message.commandName,
      isResponse: true,
      hash: message.hash,
      from: message.to,
      to: message.from,
      payload: response,
    };

    new NormalMessage(responseMessage).send();
  }

  public findCommand(command: string): Command | undefined {
    return this._commands.find(c => c.commandName === command);
  }

  public registerCommand(command: string, cb: FunctionalCommand): MessageSystem;
  public registerCommand(command: Command | Array<Command>): MessageSystem;

  public registerCommand(command: Command | Array<Command> | string, cb?: FunctionalCommand): MessageSystem {
    if (typeof command === "string") {
      if (typeof cb === "undefined") {
        return this;
      }

      const cmd: Command = {
        commandName: command,
        run: cb,
      };

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

  public deregisterCommand(command: string): MessageSystem {
    this._commands = this._commands.filter((c) => c.commandName !== command);

    return this;
  }

  private listenActiveTabChange() {
    browser.tabs.onActivated.addListener((activeInfo) => {
      browser.tabs.get(activeInfo.tabId).then((tab) => {
        TabManager.activeTab = tab;
      });
    });
  }
}
