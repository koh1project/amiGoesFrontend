import {
  Box,
  Center,
  Flex,
  HStack,
  Text,
  VStack,
  Avatar,
  View,
  Link,
} from 'native-base';

import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width - 40;

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 10,
    padding: 8,
    borderRadius: 10,
  },
  genderAge: {
    fontWeight: 'bold',
  },
});

const BlockedUsersCard = (props) => {
  const { name, gender, age } = props;

  return (
    <View style={styles.container} borderWidth={1} borderColor="#3FA8AE">
      <Center>
        <VStack mt={4} mb={4}>
          <Avatar
            bg="green.500"
            alignSelf="center"
            size="xl"
            source={{
              uri: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            }}
          >
            AJ
          </Avatar>
          <Center mt={2}>
            <Text fontSize={14} variant="body">
              {name}
            </Text>

            <Text style={styles.genderAge}>
              {gender}, {age}
            </Text>

            <Link mt={4}>SEE PROFILE</Link>
          </Center>
        </VStack>
      </Center>
    </View>
  );
};

export default BlockedUsersCard;
