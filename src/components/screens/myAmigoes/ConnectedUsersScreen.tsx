import { Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { getConnectedUsers } from '../../../services/connectedUsers.service';
import { GetConnectedUsersResponse } from '../../../types/connectedUsers';
import { useAuthContext } from '../../auth/AuthContextProvider';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

const ConnectedUsersScreen = () => {
  const { user } = useAuthContext();
  // console.log('userId', userId);

  const [connectedUsers, setConnectedUsers] =
    useState<GetConnectedUsersResponse>();

  const fetchUsers = async () => {
    const result = await getConnectedUsers(user.uid);
    const { data } = result;
    // console.log(result);
    setConnectedUsers(data);
    return data;
  };

  useEffect(() => {
    if (user) {
      fetchUsers();
    }
  }, [user]);

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text>ConnectedUsersScreen</Text>
      </View>
    </ScrollView>
  );
};

export default ConnectedUsersScreen;
