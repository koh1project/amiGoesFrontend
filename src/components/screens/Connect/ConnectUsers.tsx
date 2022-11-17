import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlatList, ScrollView, Text, View, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { connectUsers } from '../../../services/connect.service';
import { Amigo } from '../../../types/models';
import { RootStackParamList } from '../../../types/navigation';
import { useAuthContext } from '../../auth/AuthContextProvider';
import { ConnectFeedItem } from '../../list-items/ConnectFeedItem';

type ConnectUsersNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ConnectUsers'
>;
type ConnectUserRouteProp = RouteProp<RootStackParamList, 'ConnectUsers'>;
export const ConnectUsers = () => {
  const { user } = useAuthContext();
  const navigation = useNavigation<ConnectUsersNavigationProp>();

  const routes = useRoute<ConnectUserRouteProp>();

  const [amigoes, setAmigoes] = useState<Amigo[]>([]);

  const getConnectUsers = async () => {
    if (user) {
      const response = await connectUsers(user?.uid).catch((err) =>
        console.error(err),
      );
      if (response && response.data) {
        setAmigoes(response.data);
      }
    }
  };
  useEffect(() => {
    getConnectUsers();
  }, [user]);

  const handleProfileClick = (id) => {
    navigation.navigate('ConnectUserProfile', { userId: id });
  };
  return (
    <ScrollView flex={1} bg="white" paddingX={2}>
      <VStack space={3}>
        <Text variant={'h2'} color="green">
          Here are your Amigoes!
        </Text>
        <Text>
          Your AmiGoes are listed below, if you are interested, click on one to
          see more.
        </Text>
        <FlatList
          data={amigoes}
          numColumns={2}
          renderItem={({ item, index }) => {
            return (
              <View style={{ flex: 1, marginRight: index % 2 == 0 ? 10 : 0 }}>
                <ConnectFeedItem
                  amigo={item}
                  handleProfileClick={handleProfileClick}
                />
              </View>
            );
          }}
        />
        {/* <Flex padding={4} width={'100%'} flexDir={'row'} flexWrap="wrap">
          {amigoes.map((amigo, index) => (
            <>
              <ConnectFeedItem amigo={amigo} />
              {index !== amigoes.length - 1 ? <Spacer /> : <></>}
            </>
          ))}
        </Flex> */}
      </VStack>
    </ScrollView>
  );
};
