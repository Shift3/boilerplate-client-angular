export interface ILanguageTranslationKey {
  english: string;
  spanish: string;
  tagalog: string;
  vietnamese: string;
}

export class LanguageTranslationKey implements ILanguageTranslationKey {
  english: string = 'navigation.languages.english';
  spanish: string = 'navigation.languages.spanish';
  tagalog: string = 'navigation.languages.tagalog';
  vietnamese: string = 'navigation.languages.vietnamese';
}

export interface INavLinksTranslationKey {
  agencies: string;
  directory: string;
  users: string;
}

export class NavLinksTranslationKey implements INavLinksTranslationKey {
  agencies: string = 'navigation.navLinks.agencies';
  directory: string = 'navigation.navLinks.directory';
  users: string = 'navigation.navLinks.users';
}

export interface IProfileLinkTranslationKey {
  changePassword: string;
  profile: string;
}

export class ProfileLinksTranslationKey implements IProfileLinkTranslationKey {
  changePassword: string = 'navigation.userProfile.profileLinks.changePassword';
  profile: string = 'navigation.userProfile.profileLinks.profile';
}

export interface IUserProfileTranslationKey {
  imageAlt: string;
  profileLinks: IProfileLinkTranslationKey;
  signOut: string;
  toggleNavBarText: string;
  welcomeText: string;
}

export class UserProfileTranslationKey implements IUserProfileTranslationKey {
  imageAlt: string = 'navigation.userProfile.imageAlt';
  profileLinks: IProfileLinkTranslationKey = new ProfileLinksTranslationKey();
  signOut: string = 'navigation.userProfile.signOut';
  toggleNavBarText: string = 'navigation.userProfile.toggleNavBarText';
  welcomeText: string = 'navigation.userProfile.welcomeText';
}

export interface INavigationTranslationKey {
  languages: ILanguageTranslationKey;
  navLinks: INavLinksTranslationKey;
  userProfile: IUserProfileTranslationKey;
}

export class NavigationTranslationKey implements INavigationTranslationKey {
  languages: ILanguageTranslationKey = new LanguageTranslationKey();
  navLinks: INavLinksTranslationKey = new NavLinksTranslationKey();
  userProfile: IUserProfileTranslationKey = new UserProfileTranslationKey();
}
