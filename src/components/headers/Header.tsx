import { useNavigation, useRoute } from '@react-navigation/core';

import { Box, HStack, View } from 'native-base';
import ChevronLeftIcon from '../../../assets/icons/left.svg';

import BellIcon from '../../../assets/icons/bell.svg';
import Logo from '../../../assets/images/Logo.svg';

import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export const Header: React.FC = () => {
  const navigation = useNavigation();
  const [showBackButton, setShowBackButton] = useState(true);
  const route = useRoute();
  useEffect(() => {
    console.log(route.name);
    if (route.name === 'Index') {
      setShowBackButton(false);
    } else {
      setShowBackButton(true);
    }
  }, [route]);
  return (
    <Box safeAreaTop backgroundColor="#ffffff">
      <View backgroundColor="green" style={styles.Heading}>
        <HStack style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            {showBackButton && <ChevronLeftIcon style={styles.arrow} />}
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
