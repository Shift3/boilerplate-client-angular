export interface IAddressDTO {
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
}

export class AddressDTO implements IAddressDTO {
  address1: string = '';
  address2: string = '';
  city: string = '';
  state: string = '';
  zipCode: string = '';

  constructor(configOverride?: Partial<IAddressDTO>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}
