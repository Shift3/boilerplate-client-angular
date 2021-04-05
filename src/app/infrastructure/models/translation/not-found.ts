export interface INotFoundTranslationKey {
  description: string;
  goBack: string;
}

export class NotFoundTranslationKey implements INotFoundTranslationKey {
  description: string = 'notFound.description';
  goBack: string = 'notFound.goBack';
}
