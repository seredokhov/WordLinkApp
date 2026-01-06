import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { COLORS } from '../constants/theme';
import { DictionaryScreen, BookmarksScreen, LearnedScreen } from '../screens';
import Tab from '../components/tab';

const TabNavigator = createMaterialTopTabNavigator();

const screenOptions = options => {
    const { route } = options;
    const { count } = route.params || {};

    const iconsMap = {
        'Dictionary': 'book',
        'Bookmarks': 'bookmarks',
        'Learned': 'flag'
    };

    return {
        tabBarStyle: {
            borderTopRightRadius: 30
        },
        tabBarIndicatorStyle: {
            backgroundColor: COLORS.lightRed
        },
        tabBarPressColor: COLORS.gray,
        tabBarLabel:({focused}) => {
            const color = focused ? COLORS.lightRed : COLORS.darkGray;
            const label = route.name;
            const icon = iconsMap[route.name];

            return (
                <Tab
                    label={label}
                    count={count}
                    icon={icon}
                    size={15}
                    color={color}
                    type='row'
                />
            );
        },
    };
};

const DictionaryNavigator = () => {
    return (
        <TabNavigator.Navigator screenOptions={screenOptions}>
            <TabNavigator.Screen
                name="Dictionary"
                component={DictionaryScreen}
            />
            <TabNavigator.Screen
                name="Bookmarks"
                component={BookmarksScreen}
            />
            <TabNavigator.Screen
                name="Learned"
                component={LearnedScreen}
            />
        </TabNavigator.Navigator>
    );
};

export default DictionaryNavigator;


