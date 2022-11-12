import { Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useAuth } from '../../../hooks/useAuth';
import { getBlockedUsers } from '../../../services/blockedUsers.service';
import { GetBlockedUsersResponse } from '../../../types/blockedUsers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

const BlockedUsersScreen = () => {
  const userId = useAuth();

  const [blockedUsers, setBlockedUsers] = useState<GetBlockedUsersResponse>();

  const fetchUsers = async () => {
    const result = await getBlockedUsers(userId.uid);
    const { data } = result;
    console.log(result);
    setBlockedUsers(data);
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
        <Text>Blocked Users Screen</Text>
      </View>
    </ScrollView>
  );
};

export default BlockedUsersScreen;
