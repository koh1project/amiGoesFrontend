import React, { useState } from 'react';
import {
  Avatar,
  Box,
  CloseIcon,
  IconButton,
  View,
  Text,
  Input,
  VStack,
  HStack,
  Stack,
  FormControl,
  TextArea,
} from 'native-base';

export const EditProfile: React.FC = ({ route }) => {
  const currentProfileInfo = route.params;
  //const userId = currentProfileInfo._id;
  console.log('currentProfileInfo: ', currentProfileInfo);
  const [newProfileInfo, setNewProfileInfo] = useState({
    profilePicture: currentProfileInfo.profile.profilePicture,
    name: currentProfileInfo.profile.name,
    gender: currentProfileInfo.gender,
    homeCountry: currentProfileInfo.profile.homeCountry,
    languages: currentProfileInfo.profile.languages,
    bio: currentProfileInfo.profile.bio,
    hobbies: currentProfileInfo.profile.hobbies,
    contact: {
      phoneNumber: currentProfileInfo.profile.contact.phoneNumber,
    },
  });

  return (
    <View>
      <Text>Edit Profile</Text>
      <Avatar
        size="2xl"
        alignSelf={'center'}
        source={{ uri: newProfileInfo.profilePicture }}
      />
      <FormControl isRequired>
        <Stack space={4}>
          <Stack>
            <FormControl.Label>Name</FormControl.Label>
            <Input defaultValue={newProfileInfo.name} />
            <FormControl.ErrorMessage>
              Please enter your name
            </FormControl.ErrorMessage>
          </Stack>
          <Stack>
            <FormControl.Label>Home Country</FormControl.Label>
            <Input defaultValue={newProfileInfo.homeCountry} />
            <FormControl.ErrorMessage>
              Please enter your home country
            </FormControl.ErrorMessage>
          </Stack>
          <Box rounded="lg" p="1" bg="#3FA8AE" maxW="30%" maxH="10" padding="2">
            <HStack space="sm">
              <Text color="white">Languages</Text>
              <IconButton
                icon={<CloseIcon name="remove" />}
                _icon={{
                  color: 'white',
                  size: 'sm',
                }}
                _pressed={{
                  bg: 'red.500',
                  _icon: {
                    name: 'remove',
                  },
                  _ios: {
                    _icon: {
                      size: '2xl',
                    },
                  },
                }}
                _ios={{
                  _icon: {
                    size: '2xl',
                  },
                }}
              />
            </HStack>
          </Box>
          <Stack>
            <FormControl.Label>Bio</FormControl.Label>
            <TextArea defaultValue={newProfileInfo.bio} />
            <FormControl.ErrorMessage>
              Please Enter your bio
            </FormControl.ErrorMessage>
          </Stack>
          <Stack>
            <FormControl.Label>Phone Number</FormControl.Label>
            <Input defaultValue={newProfileInfo.contact.phoneNumber} />
            <FormControl.ErrorMessage>
              Please enter your phone number
            </FormControl.ErrorMessage>
          </Stack>
        </Stack>
      </FormControl>
    </View>
  );
};
