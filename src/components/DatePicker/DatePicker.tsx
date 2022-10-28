import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, View } from 'native-base';
import { useState } from 'react';
import { Platform } from 'react-native';

type DatePickerProps = {
  value: Date;
  onChange: (t: Date) => void;
};
const DatePicker = ({ value, onChange }: DatePickerProps) => {
  const [date, setDate] = useState(value);
  const [show, setShow] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    onChange(currentDate);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === 'android') {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View>
      <Button onPress={showDatepicker}>Show Date Picker</Button>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          onChange={onDateChange}
        />
      )}
    </View>
  );
};

export default DatePicker;
