import { Badge, HStack, Text, VStack } from 'native-base';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import ThumbsUp from '../../../assets/icons/thumbs-up.svg';
import { FontFamily, ThemeColors } from '../../theme';
import { Amigo } from '../../types/models';

type ConnectFeedItemProp = {
  amigo: Amigo;
  handleProfileClick: (id: string) => void;
};
export const calculateAge = (birthDate: Date) => {
  return new Date().getFullYear() - birthDate.getFullYear();
};
export const ConnectFeedItem = ({
  amigo,
  handleProfileClick,
}: ConnectFeedItemProp) => {
  return (
    <VStack style={styles.container}>
      <HStack alignItems={'center'} space={1}>
        <ThumbsUp />
        <Text variant="h4" color="green">
          Interest in
        </Text>
      </HStack>
      <HStack space={2} flexWrap={'wrap'} paddingY={1}>
        {amigo.hobbies.map((hobby, index) => (
          <Badge
            key={index}
            _text={{ color: 'white', fontFamily: FontFamily.Ubuntu_500Medium }}
            style={{ backgroundColor: ThemeColors.green, borderRadius: 5 }}
            colorScheme="success"
            marginBottom={2}
          >
            {hobby}
          </Badge>
        ))}
      </HStack>
      <VStack
        space={1}
        style={{
          marginTop: 'auto',
          borderTopWidth: 1,
          borderTopColor: ThemeColors.green,
          paddingTop: 5,
        }}
      >
        <Text
          variant={'h5'}
          fontFamily={FontFamily.Ubuntu_500Medium}
          textAlign="center"
        >
          {amigo.name}
        </Text>
        <Text textAlign={'center'} fontFamily={FontFamily.Ubuntu_500Medium}>
          {amigo.gender}, {calculateAge(new Date(amigo.birthday))}
        </Text>
        <TouchableOpacity onPress={() => handleProfileClick(amigo._id)}>
          <Text
            style={{
              textAlign: 'center',
              color: ThemeColors.coral,
              fontFamily: FontFamily.Ubuntu_700Bold,
              textTransform: 'uppercase',
              textDecorationLine: 'underline',
            }}
          >
            See Profile
          </Text>
        </TouchableOpacity>
      </VStack>
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: ThemeColors.green,
    flex: 1,
    marginBottom: 10,
  },
});
