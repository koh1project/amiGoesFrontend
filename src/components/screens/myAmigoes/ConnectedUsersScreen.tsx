import { Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useAuth } from '../../../hooks/useAuth';
import { getConnectedUsers } from '../../../services/connectedUsers.service';
import { GetConnectedUsersResponse } from '../../../types/connectedUsers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

const ConnectedUsersScreen = () => {
  const userId = useAuth();

  // console.log('userId', userId);

  const [connectedUsers, setConnectedUsers] =
    useState<GetConnectedUsersResponse>();

  const fetchUsers = async () => {
    const result = await getConnectedUsers(userId.uid);
    const { data } = result;
    console.log(result);
    setConnectedUsers(data);
    return data;
  };

  useEffect(() => {
    if (userId) {
      fetchUsers();
    }
  }, [userId]);

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text>ConnectedUsersScreen</Text>
      </View>
    </ScrollView>
  );
};

export default ConnectedUsersScreen;
