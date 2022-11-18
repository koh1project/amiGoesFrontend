import { Center, Text, VStack, Avatar, View, Link } from 'native-base';
import i18n from '../../localization/Localization';
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
  links: {
    color: '#EE6653',
    fontSize: 14,
    fontFamily: 'Ubuntu_700Bold',
  },
  linkWrapper: {
    borderBottomColor: '#EE6653',
    borderBottomWidth: 2,
    marginBottom: 1,
  },
});

const ConnectionsCard = (props) => {
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
    id,
    updateConnectedUsers,
    setUpdateConnectedUsers,
  } = props;

  return (
    <View style={styles.container} borderWidth={1} borderColor="#3FA8AE">
      <Center>
        <VStack mt={4} mb={4}>
          <Avatar
            bg="green.500"
            alignSelf="center"
            size="xl"
            source={{
              uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
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

            <View style={styles.linkWrapper}>
              <Text
                style={styles.links}
                mt={4}
                onPress={() => {
                  navigation.navigate('UserProfileScreen', {
                    name,
                    gender,
                    age,
                    homeCountry,
                    createdAt,
                    languages,
                    bio,
                    hobbies,
                    phoneNumber,
                    navigation,
                    id,
                    updateConnectedUsers,
                    setUpdateConnectedUsers,
                  });
                }}
              >
                {i18n.t('ConnectionsScreen.SeeProfile')}
              </Text>
            </View>
          </Center>
        </VStack>
      </Center>
    </View>
  );
};

export default ConnectionsCard;
