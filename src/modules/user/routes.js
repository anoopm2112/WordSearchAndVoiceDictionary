import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ROUTE_KEYS } from './constants';
import { Login, OnBoard } from './containers';

const { Navigator, Screen } = createStackNavigator();

export default function UserNavigation() {
    return (
        <Navigator initialRouteName={ROUTE_KEYS.ONBOARD} headerMode="none">
            <Screen name={ROUTE_KEYS.LOGIN_FORM} component={Login} />
            <Screen name={ROUTE_KEYS.ONBOARD} component={OnBoard} />
        </Navigator>
    );
}