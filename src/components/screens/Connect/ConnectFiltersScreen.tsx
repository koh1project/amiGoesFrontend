import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Button,
  Checkbox,
  FormControl,
  Heading,
  HStack,
  Input,
  ScrollView,
  Slider,
  Text,
  View,
  VStack,
} from 'native-base';
import React, { useState } from 'react';
import { RootStackParamList } from '../../../types/navigation';
import DatePicker from '../../DatePicker/DatePicker';
import TimePicker from '../../TimePicker/TimePicker';

type ConnectFilterScreen = NativeStackNavigationProp<
  RootStackParamList,
  'ConnectFilter'
>;
const ConnectFilterScreen = () => {
  const [sliderValue, setSliderValue] = useState(10);
  const [date, setDate] = useState<Date>(new Date());
  const [to, setTo] = useState<Date>(new Date());
  const [from, setFrom] = useState<Date>(new Date());
  const [preference, setPreference] = useState<string[]>([]);
  const [preferenceAge, setPreferenceAge] = useState({
    minimumAge: 45,
    maximumAge: 80,
  });
  const [activities, setActivities] = useState<string[]>([]);

  const navigation = useNavigation<ConnectFilterScreen>();
  const handleApplyFilter = () => {
    navigation.navigate('ConnectUsers', {
      sliderValue,
      date: date.toISOString(),
      to: to.toISOString(),
      from: from.toISOString(),
      preference,
      activities,
      preferenceAge,
    });
  };
  return (
    <ScrollView style={{ padding: 10 }}>
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
            <TimePicker title="To" value={to} onChange={setTo} />
            <TimePicker title="from" value={from} onChange={setFrom} />
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
        <View>
          <VStack space={4}>
            <Heading>Activities</Heading>
            <Text>
              What would you like to do? This is how we will find your amigoes
              for next activity
            </Text>
            <Checkbox.Group value={activities} onChange={setActivities}>
              <Checkbox value="walk">Walk</Checkbox>
              <Checkbox value="coffee">Coffee</Checkbox>
              <Checkbox value="dinner">Dinner</Checkbox>
              <Checkbox value="movie">Movie</Checkbox>
              <Checkbox value="shopping">Shopping</Checkbox>
              <Checkbox value="sports">Sports</Checkbox>
            </Checkbox.Group>
          </VStack>
          <Button onPress={handleApplyFilter} style={{ marginTop: 10 }}>
            Apply
          </Button>
        </View>
      </VStack>
    </ScrollView>
  );
};

export default ConnectFilterScreen;
