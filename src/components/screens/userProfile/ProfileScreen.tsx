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
            uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
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
