import 'react-native-gesture-handler';
import React from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';
import Toast from 'react-native-toast-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigation } from './navigation';
import { Provider } from 'react-redux';
import { store, rootSaga } from './redux';
import { theme } from './common/appTheme/blue_light';
import { toastConfig } from './config';

store.runSaga(rootSaga);

const config = {
    dependencies: {
        'linear-gradient': require('react-native-linear-gradient').default,
    },
};

export default function App() {
    return (
        <Provider store={store}>
            <NativeBaseProvider theme={theme} config={config}>
                <SafeAreaProvider>
                    <AppNavigation />
                    <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
                </SafeAreaProvider>
            </NativeBaseProvider>
        </Provider>
    );
}
