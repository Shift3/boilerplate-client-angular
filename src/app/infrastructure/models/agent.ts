import { IAddressDTO, AddressDTO } from './address';
import { IHasTranslation } from './translation/translation';

export interface IAgentTranslation {
  description: string;
}

export class AgentTranslation implements IAgentTranslation {
  description: string = '';

  constructor(configOverride?: Partial<IAgentTranslation>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}

export interface IAgentTranslationList {
  [key: string]: IAgentTranslation;
}

export class AgentTranslationList implements IAgentTranslationList {
  [key: string]: IAgentTranslation;
  constructor(configOverride?: Partial<IAgentTranslationList>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}

export interface IAgentDTO {
  id: number;
  thumbnail: string;
  name: string;
  description: string;
  email: string;
  phoneNumber: string;
  categoryList: unknown[];
  documentList: unknown[];
  address: IAddressDTO;
  agency: unknown;
  hasTranslationList: IHasTranslation[];
}

export class AgentDTO implements IAgentDTO {
  id: number = 0;
  thumbnail: string = '';
  name: string = '';
  description: string = '';
  email: string = '';
  phoneNumber: string = '';
  categoryList: unknown[] = [];
  documentList: unknown[] = [];
  address: IAddressDTO = new AddressDTO();
  agency: unknown;
  hasTranslationList: IHasTranslation[] = [];

  constructor(configOverride?: Partial<IAgentDTO>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}

export interface IAgentRequest {
  description: string;
  email: string;
  name: string;
  phoneNumber: string;
  thumbnail: string;
  address: IAddressDTO;
}

export class AgentRequest implements IAgentRequest {
  description: string = '';
  email: string = '';
  name: string = '';
  phoneNumber: string = '';
  thumbnail: string = 'https://shift3tech.com/images/s3-logo-white.svg';
  address: IAddressDTO = new AddressDTO();

  constructor(configOverride?: Partial<IAgentRequest>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}
