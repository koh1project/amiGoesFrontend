import React from 'react';
import { View, Text } from 'native-base';

export const EditProfile: React.FC = ({ route }) => {
  const { profile } = route.params;
  console.log('Edit profile screen: ', profile);

  return (
    <View>
      <Text>Edit Profile</Text>
    </View>
  );
};
