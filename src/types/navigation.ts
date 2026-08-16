import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { StackScreenProps } from '@react-navigation/stack';

export type AuthStackParamList = {
    CheckAuth: undefined;
    GetStarted: undefined;
    Login: undefined;
    Registration: undefined;
};

export type MainTabParamList = {
    Home: undefined;
    Cards: undefined;
    Practice: undefined;
    Profile: undefined;
};

export type RootStackParamList = {
    Auth: NavigatorScreenParams<AuthStackParamList> | undefined;
    App: NavigatorScreenParams<MainTabParamList> | undefined;
};

export type RegistrationStackParamList = {
    ChangeLogin: undefined;
    ChangeName: { login: string };
    ChangePassword: { login: string; name: string };
    ChangeSynchronization: {
        login: string;
        name: string;
        password: string;
    };
};

export type DictionaryTabParamList = {
    Dictionary: { count?: number } | undefined;
    Bookmarks: { count?: number } | undefined;
    Learned: { count?: number } | undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
    StackScreenProps<RootStackParamList, T>;

export type MainTabScreenProps<T extends keyof MainTabParamList> =
    CompositeScreenProps<
        BottomTabScreenProps<MainTabParamList, T>,
        RootStackScreenProps<keyof RootStackParamList>
    >;

export type DictionaryTabScreenProps<T extends keyof DictionaryTabParamList> =
    BottomTabScreenProps<DictionaryTabParamList, T>;

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
    CompositeScreenProps<StackScreenProps<AuthStackParamList, T>, RootStackScreenProps<keyof RootStackParamList>>;

export type RegistrationStackScreenProps<T extends keyof RegistrationStackParamList> =
    StackScreenProps<RegistrationStackParamList, T>;