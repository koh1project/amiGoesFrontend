import { Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { getBlockedUsers } from '../../../services/blockedUsers.service';
import { useAuthContext } from '../../auth/AuthContextProvider';
import BlockedUsersList from '../../list/BlockedUsersList';

const BlockedUsersScreen = () => {
  const { user } = useAuthContext();
  const [blockedUsers, setBlockedUsers] = useState();
  const [updateBlockedUsers, setUpdateBlockedUsers] = useState(false);

  const fetchUsers = async () => {
    const result = await getBlockedUsers(user.uid);
    const data = result.data.blockedUsers;
    setBlockedUsers(data);
    return data;
    setUpdateBlockedUsers(false);
  };

  useEffect(() => {
    if (user) {
      fetchUsers();
    }
  }, [user, updateBlockedUsers]);

  return (
    <BlockedUsersList
      blockedUsers={blockedUsers}
      updateBlockedUsers={updateBlockedUsers}
      setUpdateBlockedUsers={setUpdateBlockedUsers}
    />
  );
};

export default BlockedUsersScreen;
