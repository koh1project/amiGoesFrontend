import React, { useState, useEffect } from 'react';
import { Avatar, Button, Box, HStack, Text, View, VStack } from 'native-base';
import { getUserProfile } from '../../../services/userProfile.service';
import { useAuthContext } from '../../auth/AuthContextProvider';
import { useNavigation } from '@react-navigation/native';
import { SCREEN_NAMES } from '../../../utils/const';

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const { user } = useAuthContext();
  const userId = user?.uid;

  const [profile, setProfile] = useState();

  useEffect(() => {
    if (userId) {
      getUserProfile(userId).then((profile) => {
        setProfile(profile.data);
      });
    }
  }, []);

  console.log('profile', profile);

  return profile ? (
    <View>
      <VStack>
        <Text>Profile</Text>
        <Avatar
          size="2xl"
          alignSelf={'center'}
          source={{
            uri: profile.profilePicture,
          }}
        />
        <Text>{profile.name}</Text>
        <HStack>
          <Box>
            <Text>{profile.gender}</Text>
            <Text>{profile.age}</Text>
          </Box>
          <Box>
            <Text>{profile.homeCountry}</Text>
          </Box>
        </HStack>
        <HStack>
          {profile.languages.map((language) => (
            <Box key={language}>
              <Text>{language}</Text>
            </Box>
          ))}
        </HStack>
        <Text>Bio/About</Text>
        <Text>{profile.bio}</Text>
        <Text>Hobbies</Text>
        <HStack>
          {profile.hobbies.map((hobby) => (
            <Box key={hobby}>
              <Text>{hobby}</Text>
            </Box>
          ))}
        </HStack>
        <Text>Phone Number</Text>
        <Text>{profile.contact.phoneNumber}</Text>
      </VStack>
      <Button
        onPress={() => {
          navigation.navigate(SCREEN_NAMES.EditProfile as never, {
            profile,
          });
        }}
      >
        EDIT
      </Button>
    </View>
  ) : (
    <View>
      <Text>Loading...</Text>
    </View>
  );
};
