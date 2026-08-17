import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import {
    ChangeLoginScreen,
    ChangeNameScreen,
    ChangePasswordScreen,
    ChangeSynchronizationScreen
} from '../screens';
import { forFadeScreenAnimation } from '../utils';
import { RegistrationStackParamList } from '../types';

const Stack = createStackNavigator<RegistrationStackParamList>();

const screenOptions: StackNavigationOptions = {
    headerShown: false,
    cardStyleInterpolator: forFadeScreenAnimation
};

const RegistrationNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="ChangeLogin" screenOptions={screenOptions}>
            <Stack.Screen name="ChangeLogin" component={ChangeLoginScreen} />
            <Stack.Screen name="ChangeName" component={ChangeNameScreen} />
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
            <Stack.Screen name="ChangeSynchronization" component={ChangeSynchronizationScreen} />
        </Stack.Navigator>
    );
};

export default RegistrationNavigator;
