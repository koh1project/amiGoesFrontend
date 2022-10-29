import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import {
  Box,
  Checkbox,
  FormControl,
  Heading,
  HStack,
  Input,
  Slider,
  Text,
  View,
  VStack,
} from 'native-base';
import React, { useState } from 'react';
import DatePicker from '../../DatePicker/DatePicker';
import TimePicker from '../../TimePicker/TimePicker';

const ConnectFilterScreen = () => {
  const [sliderValue, setSliderValue] = useState(10);

  const [date, setDate] = useState<Date>(new Date());

  const [to, setTo] = useState<DateTimePickerEvent>();
  const [from, setFrom] = useState<DateTimePickerEvent>();
  const [preference, setPreference] = useState([]);
  const [preferenceAge, setPreferenceAge] = useState({
    minimumAge: 45,
    maximumAge: 80,
  });

  return (
    <Box style={{ padding: 10 }}>
      <VStack space={5}>
        <Heading>Connect</Heading>
        <FormControl>
          <Text>Location {sliderValue} kms</Text>
          <Slider
            w="3/4"
            maxW="300"
            defaultValue={sliderValue}
            minValue={1}
            maxValue={50}
            step={1}
            onChange={(v) => setSliderValue(v)}
          >
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
        </FormControl>
        <View>
          <DatePicker value={date} onChange={setDate} />
          <Text>SelectedDate: {date.toDateString()}</Text>
        </View>
        <View>
          <Text>Select Time</Text>
          <HStack
            style={{
              width: '100%',
            }}
            space={5}
          >
            <TimePicker title="To" onChange={setTo} />
            <TimePicker title="from" onChange={setFrom} />
          </HStack>
        </View>
        <View>
          <Text>Amigoes Preference</Text>
          <Text>Interested in</Text>
          <HStack space={6}>
            <Checkbox.Group onChange={setPreference} value={preference}>
              <Checkbox value="male">Male</Checkbox>
              <Checkbox value="female">Female</Checkbox>
            </Checkbox.Group>
          </HStack>
        </View>
        <View>
          <Text>Age</Text>
          <HStack space={5}>
            <VStack flex={1}>
              <Input
                type="text"
                placeholder="from"
                value={preferenceAge.minimumAge.toString()}
                onChangeText={(text) =>
                  setPreferenceAge((prev) => ({
                    ...prev,
                    minimumAge: parseInt(text) || 0,
                  }))
                }
              />
            </VStack>
            <VStack flex={1}>
              <Input
                type="text"
                placeholder="to"
                value={preferenceAge.maximumAge.toString()}
                onChangeText={(text) =>
                  setPreferenceAge((prev) => ({
                    ...prev,
                    maximumAge: parseInt(text) || 0,
                  }))
                }
              />
            </VStack>
          </HStack>
        </View>
      </VStack>
    </Box>
  );
};

export default ConnectFilterScreen;
