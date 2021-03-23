export interface INotFound {
  description: string;
  goBack: string;
}

export class NotFound implements INotFound {
  description: string = 'notFound.description';
  goBack: string = 'notFound.goBack';
}