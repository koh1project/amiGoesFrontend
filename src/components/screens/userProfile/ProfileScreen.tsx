import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import placeholder from '../../../../assets/images/placeholder.png';
import {
  Badge,
  Image,
  Button,
  Box,
  HStack,
  Text,
  View,
  ScrollView,
  VStack,
} from 'native-base';
import Info from '../../../../assets/icons/info.svg';
import { getUserProfile } from '../../../services/userProfile.service';
import { useAuthContext } from '../../auth/AuthContextProvider';
import { useNavigation } from '@react-navigation/native';
import { SCREEN_NAMES } from '../../../utils/const';
import i18n from '../../../localization/Localization';

export const ProfileScreen: React.FC = () => {
  const [userProfilePic, setUserProfilePic] = useState(placeholder);
  const navigation = useNavigation();
  const { user } = useAuthContext();
  const userId = user?.uid;
  console.log('userId: ', userId);

  const [profile, setProfile] = useState();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (userId) {
        getUserProfile(userId)
          .then((profile) => {
            console.log('profile: ', profile.data);
            setProfile(profile.data);
            if (profile.data.profilePicture) {
              console.log('profilePicture: ', profile.data.profilePicture);
              setUserProfilePic(profile.data.profilePicture);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
    return unsubscribe;
  }, []);

  return profile ? (
    <ScrollView backgroundColor="white" paddingX="12px">
      <VStack space={3}>
        <Box
          borderBottomColor="#c3c3c3"
          borderBottomWidth={1}
          style={styles.box}
        >
          <Text style={styles.title}>Profile</Text>
          <Image
            size="xl"
            source={userProfilePic}
            alt="Profile Picture"
            borderRadius={100}
            alignSelf={'center'}
          />
          <Text variant={'h2'} style={styles.userName}>
            {profile.name}
          </Text>
          <HStack space={2}>
            <Badge variant={'lightgreen'}>
              {`${profile.gender}, ${profile.age}`}
            </Badge>
            <Badge variant={'lightgreen'}>{profile.homeCountry}</Badge>
          </HStack>
        </Box>
        <Box
          borderBottomColor="#c3c3c3"
          borderBottomWidth={1}
          style={styles.box}
        >
          <Text style={styles.label}>
            {i18n.t('createProfileStepTwoForm.languages')}
          </Text>
          <HStack space={2}>
            {profile.languages.map((language) => (
              <Badge variant={'green'} key={language}>
                {language}
              </Badge>
            ))}
          </HStack>
        </Box>
        <Box
          borderBottomColor="#c3c3c3"
          borderBottomWidth={1}
          style={styles.box}
        >
          <Text style={styles.label}>
            {i18n.t('createProfileStepTwoForm.about')}
          </Text>
          <Text>{profile.bio}</Text>
        </Box>
        <Box
          borderBottomColor="#c3c3c3"
          borderBottomWidth={1}
          style={styles.box}
        >
          <Text style={styles.label}>
            {i18n.t('UserProfileScreen.Hobbies')}
          </Text>
          <HStack space={2}>
            {profile.hobbies.map((hobby) => (
              <Badge variant={'green'} key={hobby}>
                {hobby}
              </Badge>
            ))}
          </HStack>
        </Box>
        <Box style={styles.box}>
          <Text style={styles.label}>
            {i18n.t('createProfileStepOneForm.phoneNumber')}
          </Text>
          <Text>{profile.contact.phoneNumber}</Text>
        </Box>
        <Box backgroundColor="lightcoral" style={styles.disclaimer}>
          <Info width={24} height={24} />
          <Text variant="disclaimer" marginLeft={11} marginRight={18}>
            {i18n.t('createProfileStepOneForm.disclaimerID')}
          </Text>
        </Box>
      </VStack>
      <Button
        onPress={() => {
          navigation.navigate(SCREEN_NAMES.EditProfile as never, {
            profile,
          });
        }}
        variant="primaryLarge"
        alignSelf="center"
        marginBottom="24px"
      >
        EDIT
      </Button>
    </ScrollView>
  ) : (
    <View>
      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    fontFamily: 'Ubuntu_500Medium',
    lineHeight: 18,
    color: '#3fa8ae',
    marginTop: 12,
    marginBottom: 19,
  },
  title: {
    fontFamily: 'Ubuntu_500Medium',
    fontSize: 24,
    lineHeight: 28,
    color: '#3fa8ae',
    marginBottom: 18,
  },
  box: {
    paddingBottom: 24,
  },
  userName: {
    alignSelf: 'center',
    paddingBottom: 19,
    paddingTop: 12,
  },
  disclaimer: {
    padding: 14,
    borderRadius: 6,
    flexDirection: 'row',
    marginBottom: 24,
  },
});
