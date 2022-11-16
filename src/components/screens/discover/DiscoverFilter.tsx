import { Button, Box, Heading, HStack, Input, Text, View } from 'native-base';
import React, { FC, useState } from 'react';
import { Place, UserLocation } from '../../../types/discover';
import { StyleSheet, TouchableOpacity } from 'react-native';
import CloseIcon from '../../../../assets/icons/close-icon.svg';
import { useNavigation } from '@react-navigation/native';

type DiscoverFilterProps = {
  handleFilterClose: () => void;
  setFilterItems: (items: string[]) => void;
};
export const DiscoverFilter: FC<DiscoverFilterProps> = ({
  handleFilterClose,
  setFilterItems,
}) => {
  // const [to, setTo] = useState<Date>(new Date());
  // const [from, setFrom] = useState<Date>(new Date());
  const [locationText, setLocationText] = useState<string>('Vancouver,BC');

  const handleApply = () => {
    setFilterItems([locationText, 'second']);
    handleFilterClose();
  };

  return (
    <View style={styles.filterContainer}>
      <TouchableOpacity onPress={handleFilterClose}>
        <CloseIcon />
      </TouchableOpacity>
      <Input placeholder="Search a park, restaurant..."></Input>
      <View style={styles.flexBetween}>
        <Text>Location</Text>
        <Text>{locationText}</Text>
      </View>
      <Text variant="h2">Select Dates</Text>
      <Box>
        <Text variant="h3">Calendar</Text>
      </Box>
      <View>
        <Text>Select Time</Text>
        <HStack
          style={{
            width: '100%',
          }}
          space={5}
        >
          <Text>Time</Text>
        </HStack>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          alignSelf={{ base: 'center', md: 'flex-end' }}
          marginBottom={4}
          borderColor="coral"
          borderWidth={1}
          variant="primaryLargeLight"
          flexShrink={1}
          onPress={(e) => console.log(e)}
        >
          CLEAR
        </Button>
        <Button
          alignSelf={{ base: 'center', md: 'flex-end' }}
          marginBottom={4}
          variant="primaryLarge"
          flexShrink={1}
          onPress={(e) => handleApply()}
        >
          Apply
        </Button>
      </View>
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
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
