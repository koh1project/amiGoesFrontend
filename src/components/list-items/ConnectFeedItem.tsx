import { Badge, Button, Heading, HStack, Text, VStack } from 'native-base';
import React from 'react';
import { Amigo } from '../../types/models';

type ConnectFeedItemProp = {
  amigo: Amigo;
};
export const ConnectFeedItem = ({ amigo }: ConnectFeedItemProp) => {
  const calculateAge = (birthDate: Date) => {
    return new Date().getFullYear() - birthDate.getFullYear();
  };
  return (
    <VStack
      width="48%"
      marginBottom={2}
      style={{ padding: 5, borderWidth: 1, borderColor: '#3FA8AE' }}
    >
      <Text>Interest in </Text>
      <HStack
        padding={2}
        space={2}
        borderBottomWidth={1}
        borderBottomColor={'#3FA8AE'}
        flexWrap={'wrap'}
      >
        {amigo.hobbies.map((hobby, index) => (
          <Badge
            key={index}
            _text={{ color: 'white' }}
            style={{ backgroundColor: '#3FA8AE' }}
            colorScheme="success"
          >
            {hobby}
          </Badge>
        ))}
      </HStack>
      <Heading style={{ marginTop: 2 }}>{amigo.name}</Heading>
      <Text textAlign={'center'}>
        {amigo.gender} {calculateAge(new Date(amigo.birthday))}
      </Text>
      <Button>See Profile</Button>
    </VStack>
  );
};
