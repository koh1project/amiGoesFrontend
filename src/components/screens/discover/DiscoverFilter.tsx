import { Button, Box, HStack, Input, Text, View } from 'native-base';
import React, { FC, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import CloseIcon from '../../../../assets/icons/close-icon.svg';
import { DiscoverCalendar } from './DiscoverCalendar';
import TimePicker from '../../TimePicker/TimePicker';

type DiscoverFilterProps = {
  handleFilterClose: () => void;
  setFilterItems: (items: string[]) => void;
};
export const DiscoverFilter: FC<DiscoverFilterProps> = ({
  handleFilterClose,
  setFilterItems,
}) => {
  const [dateTo, setDateTo] = useState<Date>(new Date());
  const [dateFrom, setDateFrom] = useState<Date>(new Date());

  const [dayTo, setDayTo] = useState<string | null>(null);
  const [dayFrom, setDayFrom] = useState<string | null>(null);

  const [locationText, setLocationText] = useState<string>('Vancouver,BC');

  const handleApply = () => {
    const selectedItems = [];
    selectedItems.push(locationText);

    if (dayFrom && dayTo) {
      selectedItems.push(`${dayFrom} to ${dayTo}`);
    }

    if (dateFrom && dateTo) {
      selectedItems.push(
        `${dateFrom.getHours()}:${dateFrom.getMinutes()} to ${dateTo.getHours()}:${dateTo.getMinutes()}`,
      );
    }

    setFilterItems(selectedItems);

    handleFilterClose();
  };

  return (
    <View style={styles.filterContainer}>
      <TouchableOpacity onPress={handleFilterClose}>
        <CloseIcon />
      </TouchableOpacity>
      <Text>Select Location</Text>
      <Input
        placeholder="Search a park, restaurant..."
        onTextInput={(e) => {
          setLocationText(e.nativeEvent.text);
        }}
      ></Input>
      <View style={styles.flexBetween}>
        <Text>Location</Text>
        <Text>{locationText}</Text>
      </View>
      <Text variant="h2">Select Dates</Text>
      <Box>
        <DiscoverCalendar setDayTo={setDayTo} setDayFrom={setDayFrom} />
      </Box>
      <View>
        <Text variant="h2">Select Time</Text>
        <HStack
          style={{
            width: '100%',
          }}
          space={5}
        >
          <TimePicker title="From" value={dateFrom} onChange={setDateFrom} />
          <TimePicker title="To" value={dateTo} onChange={setDateTo} />
        </HStack>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          alignSelf={{ base: 'center', md: 'flex-end' }}
          borderColor="coral"
          borderWidth={1}
          variant="primaryLargeLight"
          flexShrink={1}
          onPress={() => handleFilterClose()}
        >
          CLEAR
        </Button>
        <Button
          alignSelf={{ base: 'center', md: 'flex-end' }}
          variant="primaryLarge"
          flexShrink={1}
          onPress={handleApply}
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
    paddingBottom: 0,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexGrow: 1,
    flexShrink: 1,
  },
  flexBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
