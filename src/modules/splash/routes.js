import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ROUTE_KEYS } from './constants';
import { Splash } from './containers';

const { Navigator, Screen } = createStackNavigator();

export default function SplashNavigation() {
    return (
        <Navigator initialRouteName={ROUTE_KEYS.SPLASH} headerMode="none">
            <Screen name={ROUTE_KEYS.SPLASH} component={Splash} />
        </Navigator>
    );
}