import { FlatList, HStack, ScrollView, VStack } from 'native-base';
import React, { useState } from 'react';
import { useAuthContext } from '../auth/AuthContextProvider';
import { StyleSheet, View } from 'react-native';
import BlockedUsersCard from '../listItems/BlockedUsersCard';

const BlockedUsersList = (props: any) => {
  const { user } = useAuthContext();

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingVertical: 20,
      flex: 1,
      zIndex: 1,
    },
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={props.connectedUsers}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginBottom: 15,
        }}
        renderItem={({ item }: any) => (
          <BlockedUsersCard
            name={item.blockedUserID.name}
            gender={item.blockedUserID.gender}
            age={item.blockedUserID.age}
          />
        )}
      />
    </View>
  );
};
export default BlockedUsersList;
