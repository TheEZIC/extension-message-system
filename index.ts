import MessageSystem from "./src/MessageSystem";

export * from "./src";

new MessageSystem("background")
  .registerCommand("name", (msg) => {
    msg
  })
