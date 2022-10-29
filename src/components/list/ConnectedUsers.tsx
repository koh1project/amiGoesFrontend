import { Text, View } from 'native-base';
import { useCallback, useEffect, useState } from 'react';
import { getConnectedUsers } from '../../services/connectedUsers.service';
import { GetConnectedUsersResponse } from '../../types/connectedUsers';
import { authUser } from '../../utils/firebase';

const ConnectedUsers = () => {
  const [users, setUsers] = useState<GetConnectedUsersResponse>();
  const [userId, setUserId] = useState<string>();

  const loggedInUserId = async () => {
    const loggedinUser = await authUser();

    const { uid } = loggedinUser;
    // console.log({ uid });
    setUserId(uid);
    return uid;
  };

  console.log(userId);

  const fetchUsers = useCallback(async () => {
    const result = await getConnectedUsers();

    const { data } = result;
    // console.log({ data });
    setUsers(data);
    return data;
  }, []);

  // console.log({ users });

  useEffect(() => {
    fetchUsers().catch((error) => {
      console.error(error);
    });
  }, [fetchUsers]);

  useEffect(() => {
    loggedInUserId().catch((error) => {
      console.error(error);
    });
  }, [loggedInUserId]);

  return (
    <View>
      <Text>Connected Users</Text>
    </View>
  );
};

export default ConnectedUsers;
