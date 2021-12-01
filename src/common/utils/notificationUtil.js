import PushNotification from 'react-native-push-notification';

export const showNotification = (title, message) => {
    PushNotification.createChannel(
        {
            channelId: "1", // (required)
            channelName: "My channel", // (required)
        } // (optional) callback returns whether the channel was created, false means it already existed.
    );
    PushNotification.localNotification({
        channelId: "1",
        title: title,
        message: message
    });
    // PushNotification.cancelAllLocalNotifications({ channelId: '1' })
}