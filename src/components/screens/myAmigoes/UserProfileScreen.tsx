import {
  Avatar,
  Box,
  Center,
  HStack,
  ScrollView,
  Text,
  View,
  Modal,
  VStack,
  IconButton,
  Button,
} from 'native-base';
import React, { useState } from 'react';
import moment from 'moment';
import { StyleSheet } from 'react-native';
import CalendarIcon from '../../../../assets/icons/calendar.svg';
import i18n from '../../../localization/Localization';

const styles = StyleSheet.create({
  links: {
    color: '#EE6653',
    fontSize: 18,
    fontFamily: 'Ubuntu_700Bold',
  },
  linkWrapper: {
    borderBottomColor: '#EE6653',
    borderBottomWidth: 3,
    marginBottom: 2,
  },
  section: {
    borderBottomColor: '#3D3D3D',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

const UserProfileScreen = (props) => {
  const {
    name,
    gender,
    age,
    navigation,
    homeCountry,
    createdAt,
    languages,
    bio,
    hobbies,
    phoneNumber,
  } = props.route.params;

  const formattedDate = moment(createdAt).format('DD-MMM-YY');
  const [showModal, setShowModal] = useState(false);

  return (
    <ScrollView backgroundColor="white">
      <Text variant="screenTitle">{i18n.t('UserProfileScreen.title')}</Text>
      <Center>
        <Avatar
          bg="green.500"
          alignSelf="center"
          size="xl"
          source={{
            uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
          }}
          mt={2}
          mb={3}
        >
          AJ
        </Avatar>
        <Text variant="h2">{name}</Text>
        <HStack mt={4} mb={4} space={3}>
          <Box alignSelf="center" bg="#C7F0F2" borderRadius={5}>
            <Text variant="body" padding={2.5}>
              {gender}, {age}
            </Text>
          </Box>
          <Box alignSelf="center" bg="#C7F0F2" borderRadius={5}>
            <Text variant="body" padding={2.5}>
              {homeCountry}
            </Text>
          </Box>
        </HStack>
        <HStack mt={1} mb={8} space={3}>
          <CalendarIcon />
          <Text color="#434343" fontWeight="bold">
            {i18n.t('UserProfileScreen.ConnectedOn')} {formattedDate}
          </Text>
        </HStack>

        <HStack mt={1} mb={10} space={10}>
          <View style={styles.linkWrapper}>
            <Text
              style={styles.links}
              onPress={() => {
                navigation.navigate('EmergencyScreen', {
                  name,
                });
              }}
            >
              {i18n.t('UserProfileScreen.Emergency')}
            </Text>
          </View>
          <View style={styles.linkWrapper}>
            <Text
              style={styles.links}
              onPress={() => {
                setShowModal(true);
              }}
            >
              {i18n.t('UserProfileScreen.Block')}
            </Text>
          </View>
        </HStack>
      </Center>
      <View ml={5} mr={5}>
        <Text variant="h3" color="#3FA8AE" mb={5}>
          {i18n.t('UserProfileScreen.Language')}
        </Text>
        <HStack space={3} style={styles.section}>
          {languages.map((language) => (
            <Box alignSelf="center" bg="#3FA8AE" borderRadius={5} mb={5}>
              <Text color="white" fontWeight={800} fontSize={16} padding={2.5}>
                {language}
              </Text>
            </Box>
          ))}
        </HStack>
        <View style={styles.section}>
          <Text variant="h3" color="#3FA8AE" mb={3} mt={5}>
            {i18n.t('UserProfileScreen.Bio')}
          </Text>
          <Text variant="body" mb={5}>
            {bio}
          </Text>
        </View>
        <View style={styles.section}>
          <Text variant="h3" color="#3FA8AE" mb={5} mt={5}>
            {i18n.t('UserProfileScreen.Hobbies')}
          </Text>
          <HStack space={3}>
            {hobbies.map((language) => (
              <Box alignSelf="center" bg="#3FA8AE" borderRadius={5} mb={5}>
                <Text
                  color="white"
                  fontWeight={800}
                  fontSize={16}
                  padding={2.5}
                >
                  {language}
                </Text>
              </Box>
            ))}
          </HStack>
        </View>
        <Text variant="h3" color="#3FA8AE" mb={3} mt={5}>
          {i18n.t('UserProfileScreen.PhoneNumber')}
        </Text>
        <Text variant="body" mb={1}>
          {phoneNumber}
        </Text>
        <Center>
          <HStack space={8} mb={10}>
            <Text
              variant="h4"
              mb={5}
              mt={5}
              color="#EE6653"
              borderWidth={1.5}
              borderColor="#EE6653"
              borderRadius={30}
              pt={5}
              pb={5}
              pl={10}
              pr={10}
            >
              {i18n.t('UserProfileScreen.Unfriend')}
            </Text>
            <View
              mb={5}
              mt={5}
              borderWidth={1.5}
              borderColor="#EE6653"
              borderRadius={30}
              overflow="hidden"
            >
              <Text
                variant="h4"
                color="white"
                pt={5}
                pb={5}
                pl={10}
                pr={10}
                bg="#EE6653"
              >
                {i18n.t('UserProfileScreen.Text')}
              </Text>
            </View>
          </HStack>
        </Center>
      </View>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
        <Modal.Content maxWidth="350">
          <Modal.Body>
            <VStack space={3}>
              <Text
                variant="h3"
                color="#3FA8AE"
                ml={5}
                mr={5}
                padding={3}
                textAlign="center"
              >
                {i18n.t('UserProfileScreen.PopupWarning')}
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
                {i18n.t('UserProfileScreen.PopupYes')}
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
                {i18n.t('UserProfileScreen.PopupNo')}
              </Button>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </ScrollView>
  );
};

export default UserProfileScreen;
