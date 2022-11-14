import { Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { getBlockedUsers } from '../../../services/blockedUsers.service';
import { useAuthContext } from '../../auth/AuthContextProvider';
import BlockedUsersList from '../../list/BlockedUsersList';

const BlockedUsersScreen = () => {
  const { user } = useAuthContext();
  const [blockedUsers, setBlockedUsers] = useState();

  const fetchUsers = async () => {
    const result = await getBlockedUsers(user.uid);
    const { data } = result.data.blockedUsers;
    setBlockedUsers(data);
    return data;
  };

  useEffect(() => {
    if (user) {
      fetchUsers();
    }
  }, [user]);

  return <BlockedUsersList blockedUsers={blockedUsers} />;
};

export default BlockedUsersScreen;
