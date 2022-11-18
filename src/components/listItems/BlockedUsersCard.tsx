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
  ScrollView,
  Modal,
  Button,
} from 'native-base';

import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import i18n from '../../localization/Localization';

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
  const [showModal, setShowModal] = useState(false);

  return (
    <View
      style={styles.container}
      borderWidth={1}
      borderColor="#3FA8AE"
      backgroundColor="#A09E9E"
      opacity={0.8}
    >
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

            <Link
              mt={4}
              onPress={() => {
                setShowModal(true);
              }}
            >
              {' '}
              {i18n.t('ConnectionsScreen.SeeProfile')}
            </Link>
          </Center>
        </VStack>
      </Center>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
        <Modal.Content maxWidth="350">
          <Modal.Body>
            <VStack space={3} mt={2} mb={5}>
              <Text
                variant="h3"
                color="#3FA8AE"
                ml={5}
                mr={5}
                padding={3}
                textAlign="center"
              >
                {i18n.t('BlockedUsersScreen.PopupWarning')}
              </Text>
              <Text variant="body" ml={5} mr={5} padding={3} textAlign="center">
                {i18n.t('BlockedUsersScreen.PopupDescription1')} {name}{' '}
                {i18n.t('BlockedUsersScreen.PopupDescription2')}
              </Text>
              <Button
                onPress={() => {
                  setShowModal(false);
                }}
                ml={10}
                mr={10}
                pt={5}
                pb={5}
                bg="#EE6653"
              >
                {i18n.t('BlockedUsersScreen.PopupYes')}
              </Button>
              <Button
                onPress={() => {
                  setShowModal(false);
                }}
                ml={10}
                mr={10}
                pt={5}
                pb={5}
                borderColor="#EE6653"
                variant="outline"
                colorScheme="orange"
              >
                {i18n.t('BlockedUsersScreen.PopupNo')}
              </Button>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </View>
  );
};

export default BlockedUsersCard;
