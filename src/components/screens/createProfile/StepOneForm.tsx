import DateTimePicker from '@react-native-community/datetimepicker';
import { Box, Button, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import SelectList from 'react-native-dropdown-select-list';
import Info from '../../../../assets/icons/info.svg';
import i18n from '../../../localization/Localization';
import { LooseObject } from '../../../types/models';
import { SCREEN_NAMES } from '../../../utils/const';
import { Input } from '../../form/Input';

export const StepOneForm: React.FC = ({ navigation, route }) => {
  // const navigation = useNavigation();

  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [text, setText] = useState('');
  const [genderSelected, setGenderSelected] = useState('');
  const [verified, setVerified] = useState(false);

  const [inputs, setInputs] = useState({
    name: 'Gabriela Fernandez',
    birthDate: '1962-06-27T02:05:23.812+00:00',
    gender: 'female',
    phoneNumber: '777 145 8899',
    emergencyName: 'John Fernandez',
    emergencyRelationship: 'Son',
    emergencyPhoneNumber: '777 321 1255',
    isVerified: false,
  });

  const [errors, setErrors] = useState<LooseObject>({});

  useEffect(() => {
    if (route.params?.verified) {
      setVerified(route.params.verified);
      setInputs({
        ...inputs,
        isVerified: route.params.verified,
      });
    }
  }, [route.params?.verified]);

  useEffect(() => {
    onSelectGender(genderSelected);
  }, [genderSelected]);

  const genderOptions = [
    { key: 'Male', value: 'Male' },
    { key: 'Female', value: 'Female' },
    { key: 'Other', value: 'Other' },
  ];

  function onSelectGender(genderSelected) {
    setInputs({
      ...inputs,
      gender: genderSelected,
    });
  }

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    const tempDate = new Date(currentDate);
    const fDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();
    setText(fDate);

    setInputs({
      ...inputs,
      birthDate: currentDate.toISOString(),
    });
  };

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if (!inputs.name) {
      handleError('Please enter your name', 'name');
      valid = false;
    }

    if (!inputs.birthDate) {
      handleError('Please enter your birth date', 'birthDate');
      valid = false;
    }

    if (!inputs.gender) {
      handleError('Please select your gender', 'gender');
      valid = false;
    }

    if (!inputs.phoneNumber) {
      handleError('Please enter your phone number', 'phoneNumber');
      valid = false;
    }

    if (!inputs.emergencyName) {
      handleError('Please enter your emergency contact name', 'emergencyName');
      valid = false;
    }

    if (!inputs.emergencyRelationship) {
      handleError(
        'Please enter your emergency contact relationship',
        'emergencyRelationship',
      );
      valid = false;
    }

    if (!inputs.emergencyPhoneNumber) {
      handleError(
        'Please enter your emergency contact phone number',
        'emergencyPhoneNumber',
      );
      valid = false;
    }

    if (verified === false) {
      handleError(
        'Please verify your identity before proceeding',
        'identityVerification',
      );
      valid = false;
    }

    if (valid) {
      navigation.navigate(SCREEN_NAMES.CreateProfileStepTwoForm as never, {
        inputs,
      });
    }
  };

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Text style={styles.title} color="green" marginTop={'26px'}>
          {i18n.t('createProfileStepOneForm.title')}
        </Text>
        <Text
          textAlign="center"
          marginLeft="50px"
          marginRight="50px"
          marginBottom="21px"
        >
          {i18n.t('createProfileStepOneForm.description')}
        </Text>
        <View>
          <View style={{ marginHorizontal: 20 }}>
            <Input
              label={i18n.t('createProfileStepOneForm.name')}
              placeholder="Ex. John Smith"
              error={errors.name}
              value={inputs.name}
              onFocus={() => {
                handleError(null, 'name');
              }}
              onChangeText={(text) => handleOnChange(text, 'name')}
            />
            <Text style={styles.label}>
              {i18n.t('createProfileStepOneForm.birthDate')}
            </Text>
            <TouchableOpacity onPress={() => setShow(true)}>
              <View
                style={[
                  styles.inputContainer,
                  {
                    borderColor: errors.birthDate ? 'red' : 'gray',
                    borderWidth: 1,
                  },
                ]}
              >
                <Text style={styles.input}>{text}</Text>
              </View>
              {errors.birthDate && (
                <Text style={{ color: 'red' }}>{errors.birthDate}</Text>
              )}
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                mode="date"
                display="default"
                value={date}
                minimumDate={new Date(1920, 1, 1)}
                maximumDate={new Date(2004, 1, 1)}
                onChange={onDateChange}
              />
            )}
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.label}>
                {i18n.t('createProfileStepOneForm.gender')}
              </Text>
              <View
                style={[
                  styles.inputContainer,
                  {
                    borderColor: errors.gender ? 'red' : 'gray',
                    borderWidth: 1,
                  },
                ]}
              >
                <SelectList
                  setSelected={setGenderSelected}
                  data={genderOptions}
                  search={false}
                  boxStyles={{
                    borderRadius: 0,
                    borderWidth: 0,
                    backgroundColor: 'transparent',
                  }}
                  dropdownStyles={{
                    borderRadius: 0,
                    borderWidth: 0,
                    backgroundColor: 'transparent',
                  }}
                />
              </View>
              {errors.gender && (
                <Text style={{ color: 'red' }}>{errors.gender}</Text>
              )}
            </View>
            <Input
              keyboardType="numeric"
              label={i18n.t('createProfileStepOneForm.phoneNumber')}
              placeholder="Ex. 987 654 3210"
              value={inputs.phoneNumber}
              error={errors.phoneNumber}
              onFocus={() => {
                handleError(null, 'phoneNumber');
              }}
              onChangeText={(text) => handleOnChange(text, 'phoneNumber')}
            />
          </View>
          <View backgroundColor="light" style={{ paddingHorizontal: 20 }}>
            <Text
              color="green"
              style={{
                fontSize: 18,
                fontFamily: 'Ubuntu_500Medium',
                lineHeight: 24,
                marginBottom: 10,
                marginTop: 24,
              }}
            >
              {i18n.t('createProfileStepOneForm.emergencyContact')}
            </Text>
            <Input
              label={i18n.t('createProfileStepOneForm.name')}
              placeholder="Ex. John Smith"
              value={inputs.emergencyName}
              error={errors.emergencyName}
              onFocus={() => {
                handleError(null, 'emergencyName');
              }}
              onChangeText={(text) => handleOnChange(text, 'emergencyName')}
            />
            <Input
              label={i18n.t('createProfileStepOneForm.relationship')}
              placeholder="Ex. Son"
              value={inputs.emergencyRelationship}
              error={errors.emergencyRelationship}
              onFocus={() => {
                handleError(null, 'emergencyRelationship');
              }}
              onChangeText={(text) =>
                handleOnChange(text, 'emergencyRelationship')
              }
            />
            <Input
              keyboardType="numeric"
              label={i18n.t('createProfileStepOneForm.phoneNumber')}
              placeholder="Ex. 987 654 3210"
              error={errors.emergencyPhoneNumber}
              value={inputs.emergencyPhoneNumber}
              onFocus={() => {
                handleError(null, 'emergencyPhoneNumber');
              }}
              onChangeText={(text) =>
                handleOnChange(text, 'emergencyPhoneNumber')
              }
            />
            <Box backgroundColor="lightcoral" style={styles.disclaimer}>
              <Info width={24} height={24} />
              <Text variant="disclaimer" marginLeft={11} marginRight={18}>
                {i18n.t('createProfileStepOneForm.disclaimer')}
              </Text>
            </Box>
          </View>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <Text
            color="green"
            style={{
              fontSize: 18,
              fontFamily: 'Ubuntu_500Medium',
              lineHeight: 24,
              marginBottom: 10,
              marginTop: 24,
            }}
          >
            {i18n.t('createProfileStepOneForm.id')}
          </Text>
          <Text marginBottom="10px">
            {i18n.t('createProfileStepOneForm.idDescription')}
          </Text>
          {errors.identityVerification && (
            <Text style={{ color: 'red' }}>{errors.identityVerification}</Text>
          )}
          <Button
            variant={inputs.isVerified ? 'disabledLarge' : 'primaryLargeLight'}
            disabled={inputs.isVerified}
            marginBottom="24px"
            alignSelf="center"
            onPress={() => navigation.navigate(SCREEN_NAMES.IDVerification)}
          >
            {i18n.t('createProfileStepOneForm.verify')}
          </Button>
          <Box backgroundColor="lightcoral" style={styles.disclaimer}>
            <Info width={24} height={24} />
            <Text variant="disclaimer" marginLeft={11} marginRight={18}>
              {i18n.t('createProfileStepOneForm.disclaimerID')}
            </Text>
          </Box>
        </View>
        <Button
          variant="primaryLarge"
          onPress={validate}
          alignSelf="center"
          marginBottom="24px"
        >
          {i18n.t('createProfileStepOneForm.next')}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginHorizontal: 0,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#C3C3C3',
    marginBottom: 24,
  },
  input: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Ubuntu_500Medium',
    lineHeight: 28,
    marginBottom: 10,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontFamily: 'Ubuntu_500Medium',
    lineHeight: 18,
    color: '#434343',
    marginBottom: 7,
  },
  disclaimer: {
    padding: 14,
    borderRadius: 6,
    flexDirection: 'row',
    marginBottom: 24,
  },
});
