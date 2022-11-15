import {
  Avatar,
  Box,
  Center,
  HStack,
  ScrollView,
  Text,
  View,
} from 'native-base';
import React from 'react';
import moment from 'moment';
import { StyleSheet } from 'react-native';
// import CalendarIcon from '../../../../assets/icons/calendar.svg';

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

  return (
    <ScrollView backgroundColor="white">
      <Text variant="screenTitle">My amigoes</Text>
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
          {/* <CalendarIcon /> */}
          <Text color="#434343" fontWeight="bold">
            Connected on {formattedDate}
          </Text>
        </HStack>

        <HStack mt={1} mb={10} space={10}>
          <View style={styles.linkWrapper}>
            <Text style={styles.links}>EMERGENCY</Text>
          </View>
          <View style={styles.linkWrapper}>
            <Text style={styles.links}>BLOCK</Text>
          </View>
        </HStack>
      </Center>
      <View ml={5} mr={5}>
        <Text variant="h3" color="#3FA8AE" mb={5}>
          Language
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
            Bio/About
          </Text>
          <Text variant="body" mb={5}>
            {bio}
          </Text>
        </View>
        <View style={styles.section}>
          <Text variant="h3" color="#3FA8AE" mb={5} mt={5}>
            Hobbies
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
          Phone Number
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
              UNFRIEND
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
                TEXT/CALL
              </Text>
            </View>
          </HStack>
        </Center>
      </View>
    </ScrollView>
  );
};

export default UserProfileScreen;
