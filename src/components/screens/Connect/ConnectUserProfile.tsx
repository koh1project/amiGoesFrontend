import { RouteProp, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Badge,
  Button,
  HStack,
  ScrollView,
  Text,
  View,
  VStack,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { addAmigo, getUserProfile } from '../../../services/connect.service';
import { ThemeColors } from '../../../theme';
import { Amigo } from '../../../types/models';
import { RootStackParamList } from '../../../types/navigation';
import { useAuthContext } from '../../auth/AuthContextProvider';
import { calculateAge } from '../../list-items/ConnectFeedItem';

type ConnectUserProfile = NativeStackNavigationProp<
  RootStackParamList,
  'ConnectUserProfile'
>;
type ConnectUserProfileRouteProp = RouteProp<
  RootStackParamList,
  'ConnectUserProfile'
>;

const ConnectUserProfile = () => {
  const { user } = useAuthContext();
  const [amigo, setAmigo] = useState<Amigo | null>();
  const [loading, setLoading] = useState(true);
  const route = useRoute<ConnectUserProfileRouteProp>();
  useEffect(() => {
    fetchUser(route.params.userId);
  }, [route]);

  const handleAddAmigoClick = async () => {
    const response = await addAmigo(user.uid, amigo._id);
    console.log(response);
  };

  const fetchUser = async (id) => {
    const response = await getUserProfile(id).catch((err) => console.log(err));
    if (response && response.data) {
      setAmigo(response.data);
    }
    setLoading(false);
  };
  return (
    <>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <ScrollView bg="white" paddingX={10}>
          <VStack space={1} minHeight="100%" safeAreaBottom>
            <View>
              <Text textAlign={'center'} variant={'h2'}>
                {amigo.name}
              </Text>
            </View>

            <HStack
              style={styles.ViewBottom}
              justifyContent={'center'}
              space={2}
            >
              <Badge variant={'lightgreen'}>
                {`${amigo.gender},${calculateAge(new Date(amigo.birthday))}`}
              </Badge>
              <Badge variant={'lightgreen'}>{`${amigo.homeCountry}`}</Badge>
            </HStack>

            <View style={styles.ViewBottom}>
              <Text
                style={styles.subHeader}
                variant="h3"
                color="green"
                marginBottom={2}
              >
                Language
              </Text>
              <HStack space={2}>
                {amigo.languages.map((language) => (
                  <>
                    <Badge variant="green">{language}</Badge>
                  </>
                ))}
              </HStack>
            </View>

            <View style={styles.ViewBottom}>
              <Text variant={'h3'} color="green" style={styles.subHeader}>
                Bio/About
              </Text>
              <Text>{amigo.bio}</Text>
            </View>

            <View>
              <Text variant={'h3'} color="green" style={styles.subHeader}>
                Hobbies
              </Text>
              <HStack space={2}>
                {amigo.hobbies.map((hobby) => (
                  <>
                    <Badge variant="green">{hobby}</Badge>
                  </>
                ))}
              </HStack>
            </View>
            <View style={{ marginTop: 'auto' }} justifyContent="center">
              <Button
                width="auto"
                variant="primaryLarge"
                onPress={handleAddAmigoClick}
              >
                Add as AMIGO
              </Button>
            </View>
          </VStack>
        </ScrollView>
      )}
    </>
  );
};
export default ConnectUserProfile;
const styles = StyleSheet.create({
  ViewBottom: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderBottomColor: ThemeColors.gray,
  },
  subHeader: {
    marginBottom: 10,
  },
});
