import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
    ChangeLoginScreen,
    ChangeNameScreen,
    ChangePasswordScreen,
    ChangeSynchronizationScreen
} from '../screens';
import { forFadeScreenAnimation } from "../utils";

const Stack = createStackNavigator();

const screenOptions = {
    headerShown: false,
    cardStyleInterpolator: forFadeScreenAnimation
};

const RegistrationNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="ChangeLogin" screenOptions={screenOptions}>
            <Stack.Screen name="ChangeLogin" component={ChangeLoginScreen} />
            <Stack.Screen name="ChangeName" component={ChangeNameScreen} />
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
            <Stack.Screen name="ChangeSynchronizationScreen" component={ChangeSynchronizationScreen} />
        </Stack.Navigator>
    );
};

export default RegistrationNavigator;
