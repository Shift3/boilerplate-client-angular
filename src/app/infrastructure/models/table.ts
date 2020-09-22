export interface ITableConfig {
  emptyListMessage: string;
}

export class TableConfig implements ITableConfig {
  emptyListMessage: string = 'No data';

  constructor(configOverride?: ITableConfig) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}
