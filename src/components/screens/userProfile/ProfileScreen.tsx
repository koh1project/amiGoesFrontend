import React, { useState, useEffect } from 'react';
import { Button, Box, HStack, Text, View, VStack } from 'native-base';
import { getUserProfile } from '../../../services/userProfile.service';
import { useAuthContext } from '../../auth/AuthContextProvider';

export const ProfileScreen: React.FC = () => {
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
    </View>
  ) : (
    <View>
      <Text>Loading...</Text>
    </View>
  );
};
