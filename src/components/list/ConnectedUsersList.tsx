import { FlatList, ScrollView } from 'native-base';
import React, { useState } from 'react';
import { useAuthContext } from '../auth/AuthContextProvider';
import { StyleSheet } from 'react-native';

import ConnectionsCard from '../listItems/ConnectionsCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

const ConnectedUsersList = (props: any) => {
  const { user } = useAuthContext();

  const connectedUserId = '';
  return (
    <FlatList
      data={props.connectedUsers}
      renderItem={({ item }: any) =>
        user.uid === item.userID1._id ? (
          <ConnectionsCard name={item.userID2.name} />
        ) : (
          <ConnectionsCard name={item.userID1.name} />
        )
      }
    />
  );
};
export default ConnectedUsersList;
