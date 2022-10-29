import { Text, View } from 'native-base';
import { useCallback, useEffect, useState } from 'react';
import { getConnectedUsers } from '../../services/connectedUsers.service';
import { GetConnectedUsersResponse } from '../../types/connectedUsers';

const ConnectedUsers = () => {
  const [users, setUsers] = useState<GetConnectedUsersResponse>();

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

  return (
    <View>
      <Text>Connected Users</Text>
    </View>
  );
};

export default ConnectedUsers;
