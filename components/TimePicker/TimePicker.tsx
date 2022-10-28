import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { Text, VStack } from 'native-base';

type TimePickerProps = {
  title: string;
  onChange: (e: DateTimePickerEvent) => void;
};
const TimePicker = ({ title, onChange }: TimePickerProps) => {
  return (
    <VStack flex={1} style={{ alignContent: 'flex-start' }}>
      <Text>{title}</Text>
      <DateTimePicker
        display="inline"
        testID="dateTimePicker"
        value={new Date()}
        mode="time"
        onChange={(e) => {
          onChange(e);
        }}
      />
    </VStack>
  );
};

export default TimePicker;
