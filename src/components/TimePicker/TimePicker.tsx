import DateTimePicker from '@react-native-community/datetimepicker';
import { Text, VStack } from 'native-base';

type TimePickerProps = {
  title: string;
  value: Date;
  onChange: (e: Date) => void;
};
const TimePicker = ({ title, value, onChange }: TimePickerProps) => {
  return (
    <VStack flex={1} style={{ alignContent: 'flex-start' }}>
      <Text>{title}</Text>
      <DateTimePicker
        display="inline"
        testID="dateTimePicker"
        value={value}
        mode="time"
        onChange={(e, date) => {
          onChange(date);
        }}
      />
    </VStack>
  );
};

export default TimePicker;
