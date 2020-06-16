export interface INavigation {
  id: number;
  label: string;
  link: string;
  icon?: string;
}

export class Navigation implements INavigation {
  id: number;
  label: string;
  link: string;
  icon?: string;

  constructor(configOverride?: INavigation) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}

