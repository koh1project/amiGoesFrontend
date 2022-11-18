import { FlatList } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import BlockedUsersCard from '../listItems/BlockedUsersCard';

const BlockedUsersList = (props: any) => {
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
        data={props.blockedUsers}
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
            id={item.blockedUserID._id}
          />
        )}
      />
    </View>
  );
};
export default BlockedUsersList;
