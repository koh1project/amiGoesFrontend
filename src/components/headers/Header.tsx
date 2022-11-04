import { useNavigation } from '@react-navigation/core';
import BellIcon from '../../../assets/icons/bell.svg';
import ChevronLeftIcon from '../../../assets/icons/left.svg';
import Logo from '../../../assets/images/Logo.svg';

import { Box, HStack, View } from 'native-base';

import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export const Header: React.FC = () => {
  const navigation = useNavigation();
  return (
    <Box safeAreaTop backgroundColor="#ffffff">
      <View backgroundColor="green" style={styles.Heading}>
        <HStack style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <ChevronLeftIcon style={styles.arrow} />
          </TouchableOpacity>
          <Logo style={styles.Logo} source={Logo} />
          <TouchableOpacity>
            <BellIcon style={styles.bell} />
          </TouchableOpacity>
        </HStack>
      </View>
    </Box>
  );
};

const styles = StyleSheet.create({
  Heading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 30,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    height: 84,
    marginBottom: 26,
  },
  Logo: {
    width: 82.67,
    height: 22,
  },
  header: {
    justifyContent: 'space-between',
    width: '100%',
  },
  arrow: {
    marginLeft: 20,
  },
  bell: {
    marginRight: 20,
  },
});
