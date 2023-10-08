export interface IBaseMessageContent<Payload = any> {
  commandName: string;
  tabs?: number[];
  sendToCurrent?: boolean;
  payload?: Payload;
}
