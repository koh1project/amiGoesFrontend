import { Text, View } from 'native-base';
// import useGetUserId from '../../utils/useGetUserId';
import { useCallback, useEffect, useState } from 'react';
import { getConnectedUsers } from '../../services/connectedUsers.service';
import { GetConnectedUsersResponse } from '../../types/connectedUsers';

const ConnectedUsers = () => {
  const [users, setUsers] = useState<GetConnectedUsersResponse>();

  // const fetchUsers = useCallback(async () => {
  //   const result = await getConnectedUsers();

  //   const { data } = result;
  //   setUsers(data);
  //   return data;
  // }, []);

  // console.log({ users });

  // useEffect(() => {
  //   fetchUsers().catch((error) => {
  //     console.error(error);
  //   });
  // }, [fetchUsers]);

  // const userId = async () => {
  //   const id = await useGetUserId();
  //   console.log({ id });
  // };

  // userId();
  return (
    <View>
      <Text>Connected Users</Text>
    </View>
  );
};

export default ConnectedUsers;
