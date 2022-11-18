import { useNavigation, useRoute } from '@react-navigation/core';

import { Box, HStack, View } from 'native-base';
import ChevronLeftIcon from '../../../assets/icons/left.svg';

import BellIcon from '../../../assets/icons/bell.svg';
import Logo from '../../../assets/images/Logo.svg';

import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { SCREEN_NAMES } from '../../utils/const';

export const Header: React.FC = () => {
  const navigation = useNavigation();
  const [showBackButton, setShowBackButton] = useState(true);
  const route = useRoute();
  useEffect(() => {
    if (route.name === 'Index') {
      setShowBackButton(false);
    } else {
      setShowBackButton(true);
    }
  }, [route]);

  const handleNotificationClick = () => {
    navigation.navigate(SCREEN_NAMES.NotificationScreen);
  };
  return (
    <Box safeAreaTop backgroundColor="#ffffff">
      <View backgroundColor="green" style={styles.Heading}>
        <HStack style={styles.header}>
          {showBackButton ? (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <ChevronLeftIcon style={styles.arrow} />
            </TouchableOpacity>
          ) : (
            <Box style={styles.placeholder} />
          )}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(SCREEN_NAMES.Index);
            }}
          >
            <Logo style={styles.Logo} source={Logo} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNotificationClick}>
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
  placeholder: {
    width: 20,
    marginLeft: 20,
  },
  bell: {
    marginRight: 20,
  },
});
