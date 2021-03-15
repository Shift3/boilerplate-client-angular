export type MessageType = 'dynamic' | 'static';

export interface IMessage {
  message: string;
  type: MessageType;
}

export class Message implements IMessage {
  message: string = '';
  type: MessageType = 'static';

  constructor(configOverride?: Partial<IMessage>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}
