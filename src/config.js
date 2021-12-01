import React from 'react';
import { logger } from 'react-native-logs';
import { consoleTransport } from 'react-native-logs/dist/transports/consoleTransport';
import InfoToast from 'react-native-toast-message/src/components/info';
import SuccessToast from 'react-native-toast-message/src/components/success';
import ErrorToast from 'react-native-toast-message/src/components/error';

var log = logger.createLogger({
    transport: consoleTransport,
});

if (__DEV__) {
    log.setSeverity('debug');
} else {
    log.setSeverity('error');
}

export { log };

const toastConfig = {
    success: ({ hide, ...rest }) => (
        <SuccessToast {...rest} onTrailingIconPress={hide} text1NumberOfLines={2} />
    ),
    error: ({ hide, ...rest }) => (
        <ErrorToast {...rest} onTrailingIconPress={hide} text1NumberOfLines={2} />
    ),
    info: ({ hide, ...rest }) => (
        <InfoToast {...rest} onTrailingIconPress={hide} text1NumberOfLines={2} />
    )
};

export { toastConfig };

export default {
    dictUrl: {
        url: 'https://api.dictionaryapi.dev/api/v2'
    }
};