import {
    AuthStackScreenProps,
    DictionaryTabScreenProps,
    MainTabScreenProps,
    RegistrationStackScreenProps
} from './navigation';

export type HomeScreenProps = MainTabScreenProps<'Home'>;
export type CardScreenProps = MainTabScreenProps<'Cards'>;
export type PracticeScreenProps = MainTabScreenProps<'Practice'>;
export type ProfileScreenProps = MainTabScreenProps<'Profile'>;

export type DictionaryScreenProps = DictionaryTabScreenProps<'Dictionary'>
export type BookmarksScreenProps = DictionaryTabScreenProps<'Bookmarks'>
export type LearnedScreenProps = DictionaryTabScreenProps<'Learned'>

export type LoginScreenProps = AuthStackScreenProps<'Login'>;
export type RegistrationScreenProps = AuthStackScreenProps<'Registration'>;
export type CheckAuthScreenProps = AuthStackScreenProps<'CheckAuth'>;
export type GetStartedScreenProps = AuthStackScreenProps<'GetStarted'>;

export type ChangeLoginScreenProps = RegistrationStackScreenProps<'ChangeLogin'>;
export type ChangeNameScreenProps = RegistrationStackScreenProps<'ChangeName'>;
export type ChangePasswordScreenProps = RegistrationStackScreenProps<'ChangePassword'>;
export type ChangeSynchronizationScreenProps = RegistrationStackScreenProps<'ChangeSynchronization'>;