import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Flex, Heading, ScrollView, Spacer, Text, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { connectUsers } from '../../../services/connect.service';
import { Amigo } from '../../../types/models';
import { RootStackParamList } from '../../../types/navigation';
import { ConnectFeedItem } from '../../list-items/ConnectFeedItem';

type ConnectUsersNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ConnectUsers'
>;
type ConnectUserRouteProp = RouteProp<RootStackParamList, 'ConnectUsers'>;
export const ConnectUsers = () => {
  const user = useAuth();
  const navigation = useNavigation<ConnectUsersNavigationProp>();

  const routes = useRoute<ConnectUserRouteProp>();

  const [amigoes, setAmigoes] = useState<Amigo[]>([]);

  const getConnectUsers = async () => {
    console.log(user);
    if (user) {
      const response = await connectUsers(user?.uid).catch((err) =>
        console.log(err),
      );
      if (response && response.data) {
        setAmigoes(response.data);
      }
    }
  };
  useEffect(() => {
    getConnectUsers();
  }, [user]);
  return (
    <ScrollView flex={1}>
      <VStack space={3}>
        <Heading>Here are your Amigoes</Heading>
        <Text>
          Your AmiGoes are listed below, if you are interested, click on one to
          see more.
        </Text>
        <Flex padding={4} width={'100%'} flexDir={'row'} flexWrap="wrap">
          {amigoes.map((amigo, index) => (
            <>
              <ConnectFeedItem amigo={amigo} />
              {index !== amigoes.length - 1 ? <Spacer /> : <></>}
            </>
          ))}
        </Flex>
      </VStack>
    </ScrollView>
  );
};
