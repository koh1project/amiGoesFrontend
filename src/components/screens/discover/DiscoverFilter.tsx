import {
  Box,
  Button,
  HStack,
  Input,
  ScrollView,
  Text,
  View,
} from 'native-base';
import React, { FC, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import CloseIcon from '../../../../assets/icons/close-icon.svg';
import i18n from '../../../localization/Localization';
import TimePicker from '../../TimePicker/TimePicker';
import { DiscoverCalendar } from './DiscoverCalendar';

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
    <View style={styles.filterContainer} shadow={2} flex={1} height="600">
      <TouchableOpacity onPress={handleFilterClose} style={styles.closeIcon}>
        <CloseIcon />
      </TouchableOpacity>
      <ScrollView flexGrow={1} marginTop={7}>
        <Text variant={'screenTitle'} style={styles.title}>
          {i18n.t('Discover.filter')}
        </Text>

        <Input
          placeholder={i18n.t('Discover.searchPlaceholder')}
          onTextInput={(e) => {
            setLocationText(e.nativeEvent.text);
          }}
        ></Input>
        <View style={styles.flexBetween}>
          <Text variant={'h4'}>{i18n.t('Discover.locationTitle')}</Text>
          <Text variant={'h4'}>{locationText}</Text>
        </View>
        <Text variant={'screenTitle'} style={styles.title}>
          {i18n.t('Discover.date')}
        </Text>
        <Box>
          <DiscoverCalendar setDayTo={setDayTo} setDayFrom={setDayFrom} />
        </Box>
        <View>
          <Text variant={'screenTitle'} style={styles.title}>
            {i18n.t('Discover.time')}
          </Text>
          <HStack
            style={{
              width: '100%',
              marginBottom: 24,
            }}
            space={5}
          >
            <TimePicker
              title={i18n.t('Discover.from')}
              value={dateFrom}
              onChange={setDateFrom}
            />
            <TimePicker
              title={i18n.t('Discover.to')}
              value={dateTo}
              onChange={setDateTo}
            />
          </HStack>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            variant="primarySmallLight"
            flexShrink={1}
            onPress={() => handleFilterClose()}
            marginRight={2}
          >
            {i18n.t('Discover.clear')}
          </Button>
          <Button variant="primarySmall" flexShrink={1} onPress={handleApply}>
            {i18n.t('Discover.apply')}
          </Button>
        </View>
      </ScrollView>
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
    borderRadius: 25,
    borderTopWidth: 3,
    borderTopColor: 'transparent',
    padding: 16,
    paddingBottom: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  flexBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  closeIcon: {
    position: 'absolute',
    right: 27,
    top: 22,
  },
  title: {
    marginBottom: 16,
    fontSize: 18,
    lineHeight: 24,
    marginLeft: 0,
    marginTop: 10,
  },
});
