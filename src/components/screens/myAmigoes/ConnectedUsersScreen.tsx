import React, { useEffect, useState } from 'react';
import { getConnectedUsers } from '../../../services/connectedUsers.service';
import { useAuthContext } from '../../auth/AuthContextProvider';
import ConnectedUsersList from '../../list/ConnectedUsersList';

const ConnectedUsersScreen = ({ navigation }) => {
  const { user } = useAuthContext();

  const [connectedUsers, setConnectedUsers] = useState();
  const [updateConnectedUsers, setUpdateConnectedUsers] = useState(false);

  const fetchUsers = async () => {
    const result = await getConnectedUsers(user.uid);
    const data = result.data.connectedUsers;
    setConnectedUsers(data);
    setUpdateConnectedUsers(false);
    return data;
  };

  useEffect(() => {
    if (user) {
      fetchUsers();
    }
  }, [user, updateConnectedUsers]);

  return (
    <ConnectedUsersList
      connectedUsers={connectedUsers}
      navigation={navigation}
      updateConnectedUsers={updateConnectedUsers}
      setUpdateConnectedUsers={setUpdateConnectedUsers}
    />
  );
};

export default ConnectedUsersScreen;
