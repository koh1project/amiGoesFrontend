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
import i18n from '../../../localization/Localization';
import { ThemeColors } from '../../../theme';
import { RootStackParamList } from '../../../types/navigation';
import { ActivitiesList } from '../../../utils/const';
import AmigoCalendar from '../../AmigoCalendar/AmigoCalendar';

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
    minimumAge: 42,
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
    <ScrollView bg="white" style={{ paddingHorizontal: 20 }}>
      <VStack safeAreaBottom paddingBottom={5} space={5} marginTop={'26px'}>
        <Text color="green" variant={'h1'}>
          {i18n.t('Nouns.Connect')}
        </Text>
        <View>
          <Text variant="h3" color="green">
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
          <Text>{i18n.t('ConnectScreen.Location')}</Text>
          <View>
            <Text>{i18n.t('ConnectScreen.City')}</Text>
            <Text>{sliderValue}kms</Text>
          </View>
        </View>
        <FormControl>
          <Text>{i18n.t('ConnectScreen.maxDistance')}</Text>
          <AmigoSlider initialValue={sliderValue} onChange={setSliderValue} />
        </FormControl>
        <View>
          <Text variant="h3" color="green">
            {i18n.t('ConnectScreen.dates')}
          </Text>
          <Text>{i18n.t('ConnectScreen.datesDescription')}</Text>
          <View
            style={{
              borderRadius: 24,
              backgroundColor: ThemeColors.light,
              marginTop: 20,
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
          >
            <AmigoCalendar
              initialDate={date}
              minDate={new Date().toDateString()}
              onDayPress={(date) => {
                setDate(date.dateString);
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
          <Text variant={'h3'} color="green" marginBottom={18}>
            {i18n.t('ConnectScreen.time')}
          </Text>
          <HStack
            style={{
              width: '100%',
            }}
            space={5}
          >
            <TimePicker
              title={i18n.t('ConnectScreen.from')}
              value={to}
              onChange={setTo}
            />
            <TimePicker
              title={i18n.t('ConnectScreen.to')}
              value={from}
              onChange={setFrom}
            />
          </HStack>
        </View>
        <VStack space={2}>
          <Text variant="h3" color="green">
            {i18n.t('ConnectScreen.preference')}
          </Text>
          <Text>{i18n.t('ConnectScreen.preferenceDescription')}</Text>
          <Text
            variant={'h4'}
            style={{
              marginTop: 10,
            }}
          >
            {i18n.t('ConnectScreen.interestedIn')}
          </Text>
          <HStack space={6}>
            <Checkbox.Group
              style={{ flexDirection: 'row', flexWrap: 'wrap' }}
              onChange={setPreference}
              value={preference}
            >
              <Checkbox mr={5} value="male" marginBottom={5}>
                {i18n.t('ConnectScreen.male')}
              </Checkbox>
              <Checkbox value="female" marginBottom={5}>
                {i18n.t('ConnectScreen.female')}
              </Checkbox>
              <Checkbox value="noPreference">
                {i18n.t('ConnectScreen.noPreference')}
              </Checkbox>
            </Checkbox.Group>
          </HStack>
        </VStack>
        <View>
          <Text variant={'h4'} marginBottom={'8px'}>
            {i18n.t('ConnectScreen.age')}
          </Text>
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
            <Text variant="h3" color="green">
              {i18n.t('ConnectScreen.activities')}
            </Text>
            <Text>{i18n.t('ConnectScreen.activitiesDescription')}</Text>
            <Text variant={'h4'}>
              {i18n.t('ConnectScreen.chooseActivities')}
            </Text>

            <FlatList
              data={ActivitiesList()}
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
          <Button
            variant="primarySmallLight"
            onPress={handleApplyFilter}
            flexShrink={1}
            marginRight={2}
          >
            {i18n.t('ConnectScreen.reset')}
          </Button>
          <Button
            variant={'primarySmall'}
            onPress={handleApplyFilter}
            flexShrink={1}
          >
            {i18n.t('ConnectScreen.apply')}
          </Button>
        </HStack>
      </VStack>
    </ScrollView>
  );
};

export default ConnectFilterScreen;
