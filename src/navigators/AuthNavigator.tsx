import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { LoginScreen, RegistrationScreen, GetStartedScreen, CheckAuthScreen } from '../screens';
import {forFadeScreenAnimation, forSlideScreenAnimation} from '../utils';
import { AuthStackParamList } from '../types';

const Stack = createStackNavigator<AuthStackParamList>();

const screenOptions: StackNavigationOptions = {
    headerShown: false,
    cardStyleInterpolator: forSlideScreenAnimation
};

const AuthNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="CheckAuth" screenOptions={screenOptions}>
            <Stack.Screen
                name="CheckAuth"
                component={CheckAuthScreen}
                options = {{
                    cardStyleInterpolator: forFadeScreenAnimation
                }}
            />
            <Stack.Screen
                name="GetStarted"
                component={GetStartedScreen}
                options = {{
                    cardStyleInterpolator: forFadeScreenAnimation
                }}
            />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
        </Stack.Navigator>
    );
};

export default AuthNavigator;
