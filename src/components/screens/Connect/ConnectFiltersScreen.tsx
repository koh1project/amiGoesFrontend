import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Button,
  Checkbox,
  FlatList,
  FormControl,
  HStack,
  Input,
  ScrollView,
  Text,
  View,
  VStack,
} from 'native-base';
import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import i18n from '../../../localization/Localization';
import { FontFamily, ThemeColors } from '../../../theme';
import { RootStackParamList } from '../../../types/navigation';
import { ActivitiesList } from '../../../utils/const';

import AmigoSlider from '../../form/AmigoSlider';
import CustomCheckbox from '../../form/CustomCheckbox';
import TimePicker from '../../TimePicker/TimePicker';

type ConnectFilterScreen = NativeStackNavigationProp<
  RootStackParamList,
  'ConnectFilter'
>;
const ConnectFilterScreen = () => {
  const [sliderValue, setSliderValue] = useState(10);
  const [date, setDate] = useState<string>(new Date().toDateString());
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
      date: date,
      to: to.toISOString(),
      from: from.toISOString(),
      preference,
      activities,
      preferenceAge,
    });
  };

  const handleCustomCheckboxChange = (value) => {
    if (activities.includes(value)) {
      setActivities((prev) => prev.filter((item) => item !== value));
    } else {
      setActivities((prev) => [...prev, value]);
    }
  };
  return (
    <ScrollView bg="white" style={{ paddingHorizontal: 10 }}>
      <VStack safeAreaBottom paddingBottom={5} space={5}>
        <Text color="green" variant={'h1'}>
          {i18n.t('Nouns.Connect')}
        </Text>
        <View>
          <Text variant="h2" color="green">
            {i18n.t('ConnectScreen.YourDistancePreference')}
          </Text>
          <Text color="black">
            {i18n.t('ConnectScreen.YourDistanceDescription')}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Text>Location</Text>
          <View>
            <Text>Vancouver</Text>
            <Text>{sliderValue}kms</Text>
          </View>
        </View>
        <FormControl>
          <Text>Maximum Distance</Text>
          <AmigoSlider initialValue={sliderValue} onChange={setSliderValue} />
        </FormControl>
        <View>
          <Text variant="h2" color="green">
            Select Dates
          </Text>
          <Text>
            Select what dates and time are you available to meet new amigoes
          </Text>
          <View
            style={{
              borderRadius: 24,
              backgroundColor: ThemeColors.light,
              marginTop: 20,
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
          >
            <Calendar
              initialDate={date}
              minDate={new Date().toDateString()}
              onDayPress={(date) => {
                setDate(date.dateString);
              }}
              theme={{
                calendarBackground: ThemeColors.light,
                textDisabledColor: ThemeColors.gray,
                dayTextColor: ThemeColors.dark,
                selectedDayBackgroundColor: ThemeColors.coral,
                arrowColor: ThemeColors.green,
                todayTextColor: ThemeColors.green,

                textSectionTitleColor: ThemeColors.dark,
                textDayFontFamily: FontFamily.Ubuntu_500Medium,
                textMonthFontFamily: FontFamily.Ubuntu_500Medium,
                textDayHeaderFontFamily: FontFamily.Ubuntu_400Regular,
              }}
              // markingType="period"
              markedDates={{
                [date]: { selected: true, selectedColor: ThemeColors.coral },
              }}
            />
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: ThemeColors.gray,
            paddingBottom: 20,
          }}
        >
          <Text variant={'h2'} color="green.400">
            Select Time
          </Text>
          <HStack
            style={{
              width: '100%',
            }}
            space={5}
          >
            <TimePicker title="From" value={to} onChange={setTo} />
            <TimePicker title="To" value={from} onChange={setFrom} />
          </HStack>
        </View>
        <VStack space={2}>
          <Text variant="h2" color="green">
            Amigoes Preference
          </Text>
          <Text>
            What do you want to do? Please select your options to find your
            AmiGoes.
          </Text>
          <Text variant={'h3'} style={{ fontSize: 18 }}>
            Interested In
          </Text>
          <HStack space={6}>
            <Checkbox.Group
              style={{ flexDirection: 'row' }}
              onChange={setPreference}
              value={preference}
            >
              <Checkbox mr={5} value="male">
                Male
              </Checkbox>
              <Checkbox value="female">Female</Checkbox>
            </Checkbox.Group>
          </HStack>
        </VStack>
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
            <Text variant="h2" color="green">
              Activities
            </Text>
            <Text>
              What would you like to do? This is how we will find your amigoes
              for next activity
            </Text>
            <Text variant={'h4'}>Choose one or several</Text>

            <FlatList
              data={ActivitiesList}
              numColumns={2}
              renderItem={({ item }) => (
                <CustomCheckbox
                  onChange={handleCustomCheckboxChange}
                  title={item}
                  isChecked={activities.includes(item.toLowerCase())}
                  value={item.toLowerCase()}
                />
              )}
            />
          </VStack>
        </View>
        <HStack justifyContent="space-between">
          <Button variant={'primarySmallOutlined'} onPress={handleApplyFilter}>
            Reset
          </Button>
          <Button variant={'primarySmall'} onPress={handleApplyFilter}>
            Apply
          </Button>
        </HStack>
      </VStack>
    </ScrollView>
  );
};

export default ConnectFilterScreen;
