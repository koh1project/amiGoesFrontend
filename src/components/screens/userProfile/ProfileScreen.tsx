import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import {
  Avatar,
  Button,
  Box,
  HStack,
  Text,
  View,
  ScrollView,
  VStack,
} from 'native-base';
import { getUserProfile } from '../../../services/userProfile.service';
import { useAuthContext } from '../../auth/AuthContextProvider';
import { useNavigation } from '@react-navigation/native';
import { SCREEN_NAMES } from '../../../utils/const';
import i18n from '../../../localization/Localization';

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const { user } = useAuthContext();
  const userId = user?.uid;

  const [profile, setProfile] = useState();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (userId) {
        getUserProfile(userId).then((profile) => {
          setProfile(profile.data);
        });
      }
    });
    return unsubscribe;
  }, []);

  console.log('profile', profile);

  return profile ? (
    <ScrollView>
      <VStack space={3}>
        <Text>Profile</Text>
        <Avatar
          size="2xl"
          alignSelf={'center'}
          source={{
            uri: profile.profilePicture,
          }}
        />
        <Text>{profile.name}</Text>
        <HStack space={2}>
          <Box>
            <Text>{profile.gender}</Text>
            <Text>{profile.age}</Text>
          </Box>
          <Box>
            <Text>{profile.homeCountry}</Text>
          </Box>
        </HStack>
        <Text style={styles.label}>
          {i18n.t('createProfileStepTwoForm.languages')}
        </Text>
        <HStack space={2}>
          {profile.languages.map((language) => (
            <Box key={language}>
              <Text>{language}</Text>
            </Box>
          ))}
        </HStack>
        <Text style={styles.label}>
          {i18n.t('createProfileStepTwoForm.about')}
        </Text>
        <Text>{profile.bio}</Text>
        <Text style={styles.label}>
          {i18n.t('createProfileStepTwoForm.selectHobbies')}
        </Text>
        <HStack space={2}>
          {profile.hobbies.map((hobby) => (
            <Box key={hobby}>
              <Text>{hobby}</Text>
            </Box>
          ))}
        </HStack>
        <Text style={styles.label}>
          {i18n.t('createProfileStepOneForm.phoneNumber')}
        </Text>
        <Text>{profile.contact.phoneNumber}</Text>
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
    fontSize: 14,
    fontFamily: 'Ubuntu_500Medium',
    lineHeight: 18,
    color: '#3fa8ae',
    marginTop: 10,
  },
});
