import { FlatList } from 'native-base';
import React from 'react';
import { useAuthContext } from '../auth/AuthContextProvider';
import { StyleSheet, View } from 'react-native';

import ConnectionsCard from '../listItems/ConnectionsCard';

const ConnectedUsersList = (props: any) => {
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
        renderItem={({ item }: any) =>
          user.uid === item.userID1._id ? (
            <ConnectionsCard
              name={item.userID2.name}
              gender={item.userID2.gender}
              age={item.userID2.age}
              navigation={props.navigation}
              homeCountry={item.userID2.homeCountry}
              createdAt={item.createdAt}
              languages={item.userID2.languages}
              bio={item.userID2.bio}
              hobbies={item.userID2.hobbies}
              phoneNumber={item.userID2.contact.phoneNumber}
              id={item.userID2._id}
              connectedUsers={props.connectedUsers}
              updateConnectedUsers={props.updateConnectedUsers}
              setUpdateConnectedUsers={props.setUpdateConnectedUsers}
            />
          ) : (
            <ConnectionsCard
              name={item.userID1.name}
              gender={item.userID1.gender}
              age={item.userID1.age}
              navigation={props.navigation}
              homeCountry={item.userID1.homeCountry}
              createdAt={item.createdAt}
              languages={item.userID1.languages}
              bio={item.userID1.bio}
              hobbies={item.userID1.hobbies}
              phoneNumber={item.userID1.contact.phoneNumber}
              id={item.userID1._id}
              updateConnectedUsers={props.updateConnectedUsers}
              setUpdateConnectedUsers={props.setUpdateConnectedUsers}
            />
          )
        }
      />
    </View>
  );
};
export default ConnectedUsersList;
