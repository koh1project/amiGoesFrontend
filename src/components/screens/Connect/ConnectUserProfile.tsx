import { RouteProp, useRoute } from '@react-navigation/native';
import {
  AlertDialog,
  Badge,
  Button,
  HStack,
  ScrollView,
  Text,
  View,
  VStack,
} from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  acceptAmigo,
  addAmigo,
  getUserProfile,
} from '../../../services/connect.service';
import { ThemeColors } from '../../../theme';
import { Amigo } from '../../../types/models';
import { RootStackParamList } from '../../../types/navigation';
import { useAuthContext } from '../../auth/AuthContextProvider';
import { calculateAge } from '../../list-items/ConnectFeedItem';

type ConnectUserProfileRouteProp = RouteProp<
  RootStackParamList,
  'ConnectUserProfile'
>;

const ConnectUserProfile = () => {
  const { user } = useAuthContext();
  const cancelRef = useRef(null);
  const [amigo, setAmigo] = useState<Amigo | null>();
  const [pageType, setPageType] = useState<'accept' | 'send'>('send');
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const route = useRoute<ConnectUserProfileRouteProp>();

  useEffect(() => {
    fetchUser(route.params.userId);
    if (route.params.type) {
      setPageType(route.params.type);
    }
  }, []);

  const handleAddAmigoClick = () => {
    setOpen(true);
  };

  const handleGoToConnect = async () => {
    if (pageType === 'send') {
      const response = await addAmigo(user.uid, amigo._id);
    } else {
      const response = await acceptAmigo(amigo._id, user.uid);
    }
    setOpen(false);
  };

  const handleDialogOnClose = () => {
    setOpen(false);
  };

  const fetchUser = async (id) => {
    setLoading(true);
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
                {amigo.languages?.map((language) => (
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
                {amigo.hobbies?.map((hobby) => (
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

          <AlertDialog
            leastDestructiveRef={cancelRef}
            isOpen={open}
            onClose={handleDialogOnClose}
          >
            <AlertDialog.Content>
              <AlertDialog.Body>
                <VStack
                  space={4}
                  style={{ paddingVertical: 20, paddingHorizontal: 20 }}
                >
                  <Text textAlign="center" variant={'h2'} color="green">
                    Your Request was Sent
                  </Text>
                  {pageType === 'send' && (
                    <Button
                      onPress={() => setOpen(false)}
                      variant="primaryLarge"
                      width="auto"
                    >
                      Delete Request
                    </Button>
                  )}
                  <Button
                    onPress={handleGoToConnect}
                    variant="primaryLargeOutlined"
                    width="auto"
                  >
                    Go to Connect
                  </Button>
                </VStack>
              </AlertDialog.Body>
            </AlertDialog.Content>
          </AlertDialog>
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
