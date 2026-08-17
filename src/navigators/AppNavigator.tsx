import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import { forSlideScreenAnimation } from '../utils';
import { RootStackParamList } from '../types';

const Stack = createStackNavigator<RootStackParamList>();

const theme = {
    ...DefaultTheme,
    color: {
        ...DefaultTheme.colors,
        border: 'transparent'
    }
};

const screenOptions = {
    headerShown: false,
    cardStyleInterpolator: forSlideScreenAnimation
};

const AppNavigator = () => {
    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator initialRouteName="Auth" screenOptions={screenOptions}>
                <Stack.Screen name="Auth" component={AuthNavigator} />
                <Stack.Screen name="App" component={MainNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
