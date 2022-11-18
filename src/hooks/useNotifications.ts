import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { useAuthContext } from '../components/auth/AuthContextProvider';
import { setExpoTokenForUser } from '../services/notification.service';

export const useNotifications = () => {
  const { user } = useAuthContext();
  // ask for permission to send notifications
  // if the user has not already granted permission
  const registerForPushNotificationsAsync = async () => {
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      setExpoTokenForUser(user.uid, token);

      //this.setState({ expoPushToken: token });
    } else {
      // alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  };

  // notification listener while the app is in foreground
  const handleNotification = (notification: Notifications.Notification) => {
    //this.setState({ notification: notification });
  };

  // notification listener when the user taps on the notification

  return {
    registerForPushNotificationsAsync,
    handleNotification,
  };
};
