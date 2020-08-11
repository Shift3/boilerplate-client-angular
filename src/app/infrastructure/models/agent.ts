export interface IAgentDTO {
  id: number;
  thumbnail: string;
  name: string;
  description: string;
  email: string;
  phoneNumber: string;
  categoryList: unknown[];
  documentList: unknown[];
  address: unknown;
  agency: unknown;
}

export class AgentDTO implements IAgentDTO {
  id: number;
  thumbnail: string;
  name: string;
  description: string;
  email: string;
  phoneNumber: string;
  categoryList: unknown[];
  documentList: unknown[];
  address: unknown;
  agency: unknown;

  constructor(configOverride?: Partial<IAgentDTO>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}
