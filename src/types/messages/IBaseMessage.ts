export interface IBaseMessage<Payload = any> {
  commandName: string;
  tabs?: number[];
  payload?: Payload;
}
