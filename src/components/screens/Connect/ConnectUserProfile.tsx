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
import { useEffect, useState } from 'react';
import { getUserProfile } from '../../../services/connect.service';
import { FontFamily, ThemeColors } from '../../../theme';
import { Amigo } from '../../../types/models';
import { RootStackParamList } from '../../../types/navigation';
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
  const [user, setUser] = useState<Amigo | null>();
  const [loading, setLoading] = useState(true);
  const route = useRoute<ConnectUserProfileRouteProp>();
  useEffect(() => {
    fetchUser(route.params.userId);
  }, [route]);

  const fetchUser = async (id) => {
    const response = await getUserProfile(id).catch((err) => console.log(err));
    if (response && response.data) {
      setUser(response.data);
    }
    setLoading(false);
  };
  return (
    <>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <ScrollView bg="white" paddingX={10}>
          <VStack space={1}>
            <View>
              <Text textAlign={'center'} variant={'h2'}>
                {user.name}
              </Text>
            </View>
            <HStack
              borderBottomWidth="1"
              borderBottomColor={ThemeColors.gray}
              justifyContent={'center'}
              space={2}
            >
              <Badge
                _text={{
                  color: ThemeColors.green,
                  fontFamily: FontFamily.Ubuntu_500Medium,
                }}
                style={{
                  backgroundColor: ThemeColors.lightgreen,
                  borderRadius: 5,
                }}
                colorScheme="success"
                marginBottom={2}
                flexDirection="row"
              >
                {`${user.gender},${calculateAge(new Date(user.birthday))}`}
              </Badge>
              <Badge
                _text={{
                  color: ThemeColors.green,
                  fontFamily: FontFamily.Ubuntu_500Medium,
                }}
                style={{
                  backgroundColor: ThemeColors.lightgreen,
                  borderRadius: 5,
                }}
                colorScheme="success"
                marginBottom={2}
                flexDirection="row"
              >
                {`${user.homeCountry}`}
              </Badge>
            </HStack>
            <View>
              <Text variant="h3" color="green">
                Language
              </Text>
              <HStack space={2}>
                {user.languages.map((language) => (
                  <Badge>{language}</Badge>
                ))}
              </HStack>
            </View>
            <View>
              <Text variant={'h3'} color="green">
                Bio/About
              </Text>
              <Text>{user.bio}</Text>
            </View>

            <View>
              <Text variant={'h3'} color="green">
                Hobbies
              </Text>
              <HStack>
                {user.hobbies.map((hobby) => (
                  <Text>{hobby}</Text>
                ))}
              </HStack>
            </View>
            <View>
              <Button>Add as AMIGO</Button>
            </View>
          </VStack>
        </ScrollView>
      )}
    </>
  );
};
export default ConnectUserProfile;
