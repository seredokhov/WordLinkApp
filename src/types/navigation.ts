import type { CompositeScreenProps, NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { StackScreenProps } from '@react-navigation/stack';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';

export type AuthStackParamList = {
    CheckAuth: undefined;
    GetStarted: undefined;
    Login: undefined;
    Registration: undefined;
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

export type DictionaryTabParamList = {
    Dictionary: { count?: number } | undefined;
    Bookmarks: { count?: number } | undefined;
    Learned: { count?: number } | undefined;
};

export type MainTabScreenOptionsArgs = {
    route: RouteProp<MainTabParamList, keyof MainTabParamList>;
};

export type DictionaryTabScreenOptionsArgs = {
    route: RouteProp<DictionaryTabParamList, keyof DictionaryTabParamList>;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
    StackScreenProps<RootStackParamList, T>;

export type MainTabScreenProps<T extends keyof MainTabParamList> =
    CompositeScreenProps<
        BottomTabScreenProps<MainTabParamList, T>,
        RootStackScreenProps<keyof RootStackParamList>
    >;

export type DictionaryTabScreenProps<T extends keyof DictionaryTabParamList> =
    MaterialTopTabScreenProps<DictionaryTabParamList, T>;

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
    CompositeScreenProps<StackScreenProps<AuthStackParamList, T>, RootStackScreenProps<keyof RootStackParamList>>;

export type RegistrationStackScreenProps<T extends keyof RegistrationStackParamList> =
    StackScreenProps<RegistrationStackParamList, T>;