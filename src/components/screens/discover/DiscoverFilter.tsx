import { Text, View } from 'native-base';
import React, { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Place, UserLocation } from '../../../types/discover';
import { StyleSheet, TouchableOpacity } from 'react-native';
import CloseIcon from '../../../../assets/icons/close-icon.svg';

type DiscoverFilterProps = {
  handleFilterClose: () => void;
};
export const DiscoverFilter: FC<DiscoverFilterProps> = ({
  handleFilterClose,
}) => {
  return (
    <View style={styles.filterContainer}>
      <TouchableOpacity onPress={handleFilterClose}>
        <CloseIcon />
      </TouchableOpacity>

      <Text>Select Location</Text>
      <Text>Select Location</Text>
      <Text>Select Location</Text>
      <Text>Select Location</Text>
      <Text>Select Location</Text>
      <Text>Select Location</Text>
      <Text>Select Location</Text>
      <Text>Select Location</Text>
      <Text>Select Location</Text>
      <Text>Select Location</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    borderTopWidth: 1,
    padding: 16,
  },
});
