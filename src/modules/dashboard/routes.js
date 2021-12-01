import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { ROUTE_KEYS } from './constants';
import { Dashboard, WordDetails, SideBar, VoiceWordSearch } from './containers';

const { Navigator, Screen } = createDrawerNavigator();

export default function DashboardNavigation() {
    const [initRender, setInitRender] = React.useState(true);

    React.useEffect(() => {
        setInitRender(false); // Fix to blink issue on load page
    }, [initRender]);

    return (
        <Navigator
            drawerContent={props => <SideBar {...props} />}
            drawerStyle={{ width: initRender ? null : '75%' }}
            headerMode="none"
            screenOptions={{ gestureEnabled: true }}>
            <Screen name={ROUTE_KEYS.DASHBOARD_VIEW} component={Dashboard} />
            <Screen name={ROUTE_KEYS.WORD_DETAILS} component={WordDetails} />
            <Screen name={ROUTE_KEYS.VOICEWORDSEARCH} component={VoiceWordSearch} />
        </Navigator>
    );
}