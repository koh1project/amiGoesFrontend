import { Box, Text } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import MenuIcon from '../../../assets/icons/menuIcon.svg';

const MenuItem = (props) => {
  const { navigation, route, icon, text } = props;
  return (
    <Box style={styles.container}>
      <Box style={styles.iconContainer}>
        {icon}
        <Text variant={'menu'} style={styles.text}>
          {text}
        </Text>
      </Box>

      <MenuIcon style={styles.menuIcon} />
    </Box>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(195, 195, 195, 0.25)',
    width: 162,
    height: 150,
    borderRadius: 12,
  },
  iconContainer: {
    justifyContent: 'flex-end',
    alignSelf: 'center',
    alignItems: 'center',
    // alignItems: 'center',
    // marginTop: 20,
    // marginBottom: 10,
    // backgroundColor: 'red',
    // marginBottom: 10,
    marginTop: 20,

    width: 100,
    height: 100,
  },
  menuIcon: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: -20,
    height: 40,
    width: 40,
  },
  text: {
    // alignSelf: 'center',
    // marginTop: 10,
  },
});
