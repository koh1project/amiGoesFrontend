import { Box } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { getConnectedUsers } from '../../../services/connectedUsers.service';
import { useAuthContext } from '../../auth/AuthContextProvider';
import ConnectedUsersList from '../../list/ConnectedUsersList';

const ConnectedUsersScreen = () => {
  const { user } = useAuthContext();

  const [connectedUsers, setConnectedUsers] = useState();

  const fetchUsers = async () => {
    const result = await getConnectedUsers(user.uid);
    const data = result.data.connectedUsers;
    setConnectedUsers(data);
    return data;
  };

  useEffect(() => {
    if (user) {
      fetchUsers();
    }
  }, [user]);

  return <ConnectedUsersList connectedUsers={connectedUsers} />;
};

export default ConnectedUsersScreen;
