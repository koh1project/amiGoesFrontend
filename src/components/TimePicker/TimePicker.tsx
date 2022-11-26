import {
  DateTimePickerAndroid,
  default as RNDateTimePicker,
} from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Button, Input, Text, VStack } from 'native-base';
import React, { useState } from 'react';
import { Platform } from 'react-native';

type TimePickerProps = {
  title: string;
  value: Date;
  onChange: (e: Date) => void;
};

const TimePicker = ({ title, value, onChange }: TimePickerProps) => {
  const [show, setShow] = useState(false);
  const onDateChange = (e, date) => {
    onChange(date);
  };
  return (
    <VStack flex={1} style={{ alignContent: 'flex-start' }}>
      <Text>{title}</Text>
      <Input
        value={`${moment(value).format('hh:mm a')}`}
        onFocus={() => {
          setShow(true);
          if (Platform.OS === 'android') {
            DateTimePickerAndroid.open({
              value: value,
              mode: 'time',
              onChange: onDateChange,
            });
          }
        }}
      />
      {show && Platform.OS === 'ios' && (
        <>
          <RNDateTimePicker
            display="spinner"
            value={value}
            mode="time"
            is24Hour={false}
            onChange={onDateChange}
          />
          {Platform.OS === 'ios' && (
            <Button variant="solid" bg="green" onPress={() => setShow(false)}>
              Close
            </Button>
          )}
        </>
      )}
    </VStack>
  );
};

export default TimePicker;
