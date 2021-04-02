export interface IDynamicTableHeader {
  actions: string;
  activated: string;
  agency: string;
  agencyName: string;
  description: string;
  email: string;
  firstName: string;
  lastName: string;
  name: string;
  phoneNumber: string;
  role: string;
}

export class DynamicTableHeader implements IDynamicTableHeader {
  actions: string = 'dynamicTable.header.actions';
  activated: string = 'dynamicTable.header.activated';
  agency: string = 'dynamicTable.header.agency';
  agencyName: string = 'dynamicTable.header.agencyName';
  description: string = 'dynamicTable.header.description';
  email: string = 'dynamicTable.header.email';
  firstName: string = 'dynamicTable.header.firstName';
  lastName: string = 'dynamicTable.header.lastName';
  name: string = 'dynamicTable.header.name';
  phoneNumber: string = 'dynamicTable.header.phoneNumber';
  role: string = 'dynamicTable.header.role';
}

export interface IDynamicTableBody {
  emptyListMessage: string;
  thumbnail: string;
}

export class DynamicTableBody implements IDynamicTableBody {
  emptyListMessage: string = 'dynamicTable.body.emptyListMessage';
  thumbnail: string = 'dynamicTable.body.thumbnail';
}

export interface IDynamicTablePopover {
  instructions: string;
}

export class DynamicTablePopover implements IDynamicTablePopover {
  instructions: string = 'dynamicTable.popover.instructions';
}

export interface IDynamicTableTooltip {
  deleteAgency: string;
  deleteAgent: string;
  deleteUser: string;
  resendActivationEmail: string;
  resetPassword: string;
  updateAgency: string;
  updateAgent: string;
  updateUser: string;
}

export class DynamicTableTooltip implements IDynamicTableTooltip {
  deleteAgency: string = 'dynamicTable.tooltip.deleteAgency';
  deleteAgent: string = 'dynamicTable.tooltip.deleteAgent';
  deleteUser: string = 'dynamicTable.tooltip.deleteUser';
  resendActivationEmail: string = 'dynamicTable.tooltip.resendActivationEmail';
  resetPassword: string = 'dynamicTable.tooltip.resetPassword';
  updateAgency: string = 'dynamicTable.tooltip.updateAgency';
  updateAgent: string = 'dynamicTable.tooltip.updateAgent';
  updateUser: string = 'dynamicTable.tooltip.updateUser';
}

export interface IDynamicTableTranslationKey {
  header: IDynamicTableHeader;
  body: IDynamicTableBody;
  tooltip: IDynamicTableTooltip;
}

export class DynamicTableTranslationKey implements IDynamicTableTranslationKey {
  header: IDynamicTableHeader = new DynamicTableHeader();
  body: IDynamicTableBody = new DynamicTableBody();
  tooltip: IDynamicTableTooltip = new DynamicTableTooltip();
}
