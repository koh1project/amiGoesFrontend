import { FlatList, ScrollView, Text, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { getPendingRequests } from '../../../services/connect.service';
import { ThemeColors } from '../../../theme';
import { PendingRequestResponse } from '../../../types/models';
import { useAuthContext } from '../../auth/AuthContextProvider';
import NotificationItem from '../../list-items/NotificationItem';

export const NotificationScreen = () => {
  const { user } = useAuthContext();
  const [requests, setRequests] = useState<PendingRequestResponse[]>();

  const getRequests = async () => {
    const response = await getPendingRequests(user.uid);
    if (response && response.data) {
      setRequests(response.data);
    }
  };
  useEffect(() => {
    console.log(user.uid);
    getRequests();
  }, []);

  return (
    <ScrollView style={styles.scrollViewContainer}>
      <VStack>
        <Text variant={'h2'} color="green">
          Notifications
        </Text>
        <Text>
          Your activities can be viewed here, friends can be added, or the
          request can be deleted if you wish.
        </Text>
        <FlatList
          data={requests}
          renderItem={({ item }) => <NotificationItem request={item} />}
        />
      </VStack>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: ThemeColors.white,
    paddingHorizontal: 20,
  },
});
