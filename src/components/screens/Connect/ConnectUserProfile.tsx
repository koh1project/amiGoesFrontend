import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
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
import i18n from '../../../localization/Localization';
import {
  acceptAmigo,
  addAmigo,
  getUserProfile,
} from '../../../services/connect.service';
import { translate } from '../../../services/translate.service';
import { ThemeColors } from '../../../theme';
import { Amigo } from '../../../types/models';
import { RootStackParamList } from '../../../types/navigation';
import { SCREEN_NAMES } from '../../../utils/const';
import { useAuthContext } from '../../auth/AuthContextProvider';
import { calculateAge } from '../../list-items/ConnectFeedItem';

type ConnectUserProfileRouteProp = RouteProp<
  RootStackParamList,
  'ConnectUserProfile'
>;
type ConnectUserProfileNavigation = NativeStackNavigationProp<
  RootStackParamList,
  'ConnectFilter'
>;
const ConnectUserProfile = () => {
  const { user } = useAuthContext();
  const cancelRef = useRef(null);
  const [amigo, setAmigo] = useState<Amigo | null>();
  const [pageType, setPageType] = useState<'accept' | 'send'>('send');
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const route = useRoute<ConnectUserProfileRouteProp>();
  const [bio, setBio] = useState(null);
  const lang = i18n.locale.slice(0, 2);
  const [hobbies, setHobbies] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const navigation = useNavigation<ConnectUserProfileNavigation>();

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
      navigation.navigate(SCREEN_NAMES.ConnectedUsersScreen);
      setDisabled(true);
    } else {
      console.log(amigo.name, user);
      const response = await acceptAmigo(amigo._id, user.uid);
    }
    setOpen(false);
  };

  const handleDialogOnClose = () => {
    setOpen(false);
  };

  const transBio = async (lang, text) => {
    const translated = await translate(lang, text).catch((err) =>
      console.error(err),
    );
    if (translated) {
      setBio(translated.data);
    }
  };

  const transHobbies = async (lang, arr) => {
    arr.forEach(async (hobby) => {
      const translated = await translate(lang, hobby).catch((err) =>
        console.error(err),
      );
      if (translated) {
        setHobbies((prev) => [...prev, translated.data]);
      }
    });
  };

  const fetchUser = async (id) => {
    setLoading(true);
    const response = await getUserProfile(id).catch((err) => console.log(err));
    if (response && response.data) {
      setAmigo(response.data);
      console.log(amigo);
      if (lang !== 'en') {
        transBio(lang, response.data.bio);
        transHobbies(lang, response.data.hobbies);
      }
    }

    setLoading(false);
  };
  return (
    <>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <ScrollView bg="white" paddingX={10}>
          <VStack space={1} minHeight="100%" safeAreaBottom marginTop={'26px'}>
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
                {`${
                  amigo.gender === 'Male'
                    ? i18n.t('ConnectUsers.male')
                    : i18n.t('ConnectUsers.female')
                }, ${calculateAge(new Date(amigo.birthday))}`}
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
                {i18n.t('ConnectUsers.languages')}
              </Text>
              <HStack space={2}>
                {amigo.languages?.map((language) => (
                  <>
                    <Badge variant="green">
                      {language === 'English'
                        ? i18n.t('ConnectUsers.english')
                        : language === 'Spanish'
                        ? i18n.t('ConnectUsers.spanish')
                        : language === 'French'
                        ? i18n.t('ConnectUsers.french')
                        : language === 'German'
                        ? i18n.t('ConnectUsers.german')
                        : language === 'Italian'
                        ? i18n.t('ConnectUsers.italian')
                        : language === 'Portuguese'
                        ? i18n.t('ConnectUsers.portuguese')
                        : language === 'Russian'
                        ? i18n.t('ConnectUsers.russian')
                        : language === 'Chinese'
                        ? i18n.t('ConnectUsers.chinese')
                        : language === 'Japanese'
                        ? i18n.t('ConnectUsers.japanese')
                        : language === 'Arabic'
                        ? i18n.t('ConnectUsers.arabic')
                        : language === 'Hindi'
                        ? i18n.t('ConnectUsers.hindi')
                        : language === 'Korean'
                        ? i18n.t('ConnectUsers.korean')
                        : language}
                    </Badge>
                  </>
                ))}
              </HStack>
            </View>

            <View style={styles.ViewBottom}>
              <Text variant={'h3'} color="green" style={styles.subHeader}>
                {i18n.t('ConnectUsers.bio')}
              </Text>
              <Text>{lang === 'en' ? amigo?.bio : bio}</Text>
            </View>

            <View>
              <Text variant={'h3'} color="green" style={styles.subHeader}>
                {i18n.t('ConnectUsers.hobbies')}
              </Text>
              <HStack space={2}>
                {lang === 'en'
                  ? amigo.hobbies?.map((hobby) => (
                      <>
                        <Badge variant="green">{hobby}</Badge>
                      </>
                    ))
                  : hobbies.map((hobby) => (
                      <>
                        <Badge variant="green">{hobby}</Badge>
                      </>
                    ))}
              </HStack>
            </View>
            <View
              style={{ marginTop: 'auto', flex: 1, height: 200 }}
              justifyContent="center"
            >
              <Button
                width="auto"
                variant={disabled ? 'disabled' : 'primaryLarge'}
                onPress={handleAddAmigoClick}
                disabled={disabled}
              >
                {disabled
                  ? i18n.t('ConnectUsers.requestSent')
                  : i18n.t('ConnectUsers.addAmigo')}
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
                    {i18n.t('ConnectUsers.modalTitle')}
                  </Text>
                  {pageType === 'send' && (
                    <Button
                      onPress={() => setOpen(false)}
                      variant="primaryLarge"
                      width="auto"
                    >
                      {i18n.t('ConnectUsers.cancel')}
                    </Button>
                  )}
                  <Button
                    onPress={handleGoToConnect}
                    variant="primaryLargeOutlined"
                    width="auto"
                  >
                    {i18n.t('ConnectUsers.connect')}
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
