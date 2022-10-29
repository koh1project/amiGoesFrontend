import { Text, View } from 'native-base';
import { useCallback, useEffect, useState } from 'react';
import { getBlockedUsers } from '../../services/blockedUsers.service';
import { GetBlockedUsersResponse } from '../../types/blockedUsers';

const BlockedUsers = () => {
  const [users, setUsers] = useState<GetBlockedUsersResponse>();

  const fetchUsers = useCallback(async () => {
    const result = await getBlockedUsers();
    const { data } = result;
    // console.log({ data });

    setUsers(data);
    return data;
  }, []);

  useEffect(() => {
    fetchUsers().catch((error) => {
      console.error(error);
    });
  }, [fetchUsers]);

  return (
    <View>
      <Text>Blocked Users</Text>
    </View>
  );
};

export default BlockedUsers;
