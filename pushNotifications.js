import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export default function usePushNotifications() {
  useEffect(() => {
    (async () => {
      const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      if (status !== 'granted') {
        const { status: newStatus } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        if (newStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log('Push Notification Token:', token);
      // Send token to your backend for notifications
    })();

    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });

    return () => subscription.remove();
  }, []);
}
