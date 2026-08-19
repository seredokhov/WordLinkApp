import React from 'react';
import { createBottomTabNavigator, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { COLORS } from '../constants/theme';
import { HomeScreen, CardsScreen, ProfileScreen, PracticeScreen, DictionariesScreen } from '../screens';
import Tab from '../components/tab';
import { MainTabParamList, MainTabScreenOptionsArgs } from '../types';

const TabNavigator = createBottomTabNavigator<MainTabParamList>();

const screenOptions = (options: MainTabScreenOptionsArgs): BottomTabNavigationOptions => {
    const { route } = options;

    const iconsMap: Record<keyof MainTabParamList, string> = {
        Home: 'home',
        Cards: 'layers',
        Practice: 'school',
        Profile: 'person-circle',
        Dictionaries: 'book',
    };

    const labelsMap: Record<keyof MainTabParamList, string> = {
        Home: 'Home',
        Cards: 'Cards',
        Practice: 'Practice',
        Profile: 'Profile',
        Dictionaries: 'Dictionaries',
    };

    const baseOptions: BottomTabNavigationOptions = {
        headerShown: false,
        tabBarActiveTintColor: COLORS.lightRed,
        tabBarInactiveTintColor: COLORS.darkGray,
        tabBarItemStyle: {
            paddingTop: 3,
        },
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => {
            const color = focused ? COLORS.lightRed : COLORS.darkGray;
            const label = labelsMap[route.name];
            const icon = iconsMap[route.name];

            return (
                <Tab
                    label={label}
                    icon={icon}
                    size={25}
                    fontSize={10}
                    color={color}
                    type="column"
                />
            );
        },
    };

    if (route.name === 'Dictionaries') {
        return {
            ...baseOptions,
            tabBarButton: () => null,
        };
    }

    return baseOptions;
};

const MainNavigator = () => {
    return (
        <TabNavigator.Navigator initialRouteName="Home" screenOptions={screenOptions}>
            <TabNavigator.Screen name="Home" component={HomeScreen} />
            <TabNavigator.Screen name="Cards" component={CardsScreen} />
            <TabNavigator.Screen name="Practice" component={PracticeScreen} />
            <TabNavigator.Screen name="Profile" component={ProfileScreen} />
            <TabNavigator.Screen name="Dictionaries" component={DictionariesScreen} />
        </TabNavigator.Navigator>
    );
};

export default MainNavigator;
