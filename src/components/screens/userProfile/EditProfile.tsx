import React, { useState, useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import { useNavigation } from '@react-navigation/core';
import {
  Avatar,
  Button,
  ScrollView,
  View,
  Text,
  Input,
  Select,
  Stack,
  FormControl,
  TextArea,
} from 'native-base';
import { languagesOptions, hobbiesOptions } from '../../../utils/const';
import i18n from '../../../localization/Localization';

export const EditProfile: React.FC = ({ route }) => {
  const currentProfileInfo = route.params;
  const userId = currentProfileInfo.profile._id;
  const [error, setError] = useState('');
  const [genderSelected, setGenderSelected] = useState(
    currentProfileInfo.profile.gender,
  );
  const [selectedLanguages, setSelectedLanguages] = useState(
    currentProfileInfo.profile.languages,
  );
  const [selectedHobbies, setSelectedHobbies] = useState(
    currentProfileInfo.profile.hobbies,
  );
  const navigation = useNavigation();
  const [newProfileInfo, setNewProfileInfo] = useState({
    profilePicture: currentProfileInfo.profile.profilePicture,
    name: currentProfileInfo.profile.name,
    gender: currentProfileInfo.gender,
    homeCountry: currentProfileInfo.profile.homeCountry,
    languages: currentProfileInfo.profile.languages,
    bio: currentProfileInfo.profile.bio,
    hobbies: currentProfileInfo.profile.hobbies,
    contact: {
      phoneNumber: currentProfileInfo.profile.contact.phoneNumber,
    },
  });

  useEffect(() => {
    onSelectGender(genderSelected);
  }, [genderSelected]);

  function onSelectGender(genderSelected) {
    setNewProfileInfo({
      ...newProfileInfo,
      gender: genderSelected,
    });
    setGenderSelected(genderSelected);
  }

  const onSelectedLanguagesChange = (selectedItems) => {
    setSelectedLanguages(selectedItems);
    setNewProfileInfo((prevState) => ({
      ...prevState,
      languages: selectedItems,
    }));
  };

  const onSelectedHobbiesChange = (selectedItems) => {
    setSelectedHobbies(selectedItems);
    setNewProfileInfo((prevState) => ({
      ...prevState,
      hobbies: selectedItems,
    }));
  };

  const handleOnChange = (text, input) => {
    if (input === 'phoneNumber') {
      setNewProfileInfo((prevState) => ({
        ...prevState,
        contact: { phoneNumber: text },
      }));
    } else {
      setNewProfileInfo((prevState) => ({ ...prevState, [input]: text }));
    }
  };

  const validate = () => {
    if (newProfileInfo.name === '') {
      setError('nameError');
      return false;
    }
    if (newProfileInfo.homeCountry === '') {
      setError('homeCountryError');
      return false;
    }
    if (newProfileInfo.gender === '') {
      setError('genderError');
      return false;
    }
    if (newProfileInfo.languages.length < 1) {
      setError('languagesError');
      return false;
    }
    if (newProfileInfo.bio === '') {
      setError('bioError');
      return false;
    }
    if (newProfileInfo.hobbies.length < 1) {
      setError('hobbiesError');
      return false;
    }
    if (newProfileInfo.contact.phoneNumber === '') {
      setError('phoneNumberError');
      return false;
    }
    setError('');
    return true;
  };

  return (
    <ScrollView style={styles.container}>
      <Text>Edit Profile</Text>
      <Avatar
        size="2xl"
        alignSelf={'center'}
        source={{ uri: newProfileInfo.profilePicture }}
      />
      <FormControl isRequired>
        <Stack space={4}>
          <Stack>
            <FormControl.Label>
              {i18n.t('createProfileStepOneForm.name')}
            </FormControl.Label>
            <Input
              defaultValue={newProfileInfo.name}
              onChangeText={(text) => handleOnChange(text, 'name')}
            />
            {error === 'nameError' && (
              <Text style={styles.error}>Please enter your name</Text>
            )}
          </Stack>
          <Stack>
            <FormControl.Label>
              {i18n.t('createProfileStepTwoForm.country')}
            </FormControl.Label>
            <Input
              defaultValue={newProfileInfo.homeCountry}
              onChangeText={(text) => handleOnChange(text, 'homeCountry')}
            />
            {error === 'homeCountryError' && (
              <Text style={styles.error}>Please enter your home country</Text>
            )}
          </Stack>
          <Stack>
            <FormControl.Label>
              {i18n.t('createProfileStepOneForm.gender')}
            </FormControl.Label>
            <Select
              defaultValue={genderSelected}
              onValueChange={(itemValue) => onSelectGender(itemValue)}
            >
              <Select.Item label="Female" value="Female" />
              <Select.Item label="Male" value="Male" />
              <Select.Item label="Other" value="Other" />
            </Select>
            {error === 'genderError' && (
              <Text style={styles.error}>Please select your gender</Text>
            )}
          </Stack>
          <View>
            <Text style={styles.label}>
              {i18n.t('createProfileStepTwoForm.languages')}
            </Text>
            <Text marginBottom="12px">
              {i18n.t('createProfileStepTwoForm.languagesSubtitle')}
            </Text>
          </View>
          <MultiSelect
            fontFamily="Ubuntu_400Regular"
            fontSize={14}
            items={languagesOptions}
            uniqueKey="id"
            onSelectedItemsChange={onSelectedLanguagesChange}
            selectedItems={selectedLanguages}
            selectText={i18n.t('createProfileStepTwoForm.selectLanguages')}
            displayKey="name"
            tagRemoveIconColor="#f8f8f8"
            tagTextColor="white"
            selectedItemTextColor="#3fa8ae"
            selectedItemIconColor="#3fa8ae"
            itemTextColor="#434343"
            submitButtonColor="#3fa8ae"
            submitButtonText="Done"
            styleMainWrapper={{
              marginBottom: 20,
              borderWidth: 1,
              borderRadius: 6,
              borderColor: '#C3C3C3',
              position: 'relative',
              paddingHorizontal: 15,
            }}
            styleDropdownMenuSubsection={{
              borderWidth: 0,
              borderRadius: 6,
              borderColor: 'transparent',
              position: 'absolute',
              top: 0,
              width: '100%',
              height: '100%',
            }}
            styleItemsContainer={{
              backgroundColor: 'white',
              borderColor: 'white',
              borderLeftWidth: 0,
            }}
            tagContainerStyle={{
              borderRadius: 6,
              backgroundColor: '#3fa8ae',
              borderColor: '#3fa8ae',
            }}
            removeSelected
          />
          {error === 'languagesError' && (
            <Text style={styles.error}>Please select your languages</Text>
          )}
          <Stack>
            <FormControl.Label>
              {i18n.t('createProfileStepTwoForm.about')}
            </FormControl.Label>
            <TextArea
              defaultValue={newProfileInfo.bio}
              onChangeText={(text) => handleOnChange(text, 'bio')}
            />
            {error === 'bioError' && (
              <Text style={styles.error}>Please enter your bio</Text>
            )}
          </Stack>
          <View>
            <Text style={styles.label}>
              {i18n.t('createProfileStepTwoForm.selectHobbies')}
            </Text>
          </View>
          <MultiSelect
            fontFamily="Ubuntu_400Regular"
            fontSize={14}
            items={hobbiesOptions}
            uniqueKey="id"
            onSelectedItemsChange={onSelectedHobbiesChange}
            selectedItems={selectedHobbies}
            selectText={i18n.t('createProfileStepTwoForm.selectHobbies')}
            displayKey="name"
            tagRemoveIconColor="#f8f8f8"
            tagTextColor="white"
            selectedItemTextColor="#3fa8ae"
            selectedItemIconColor="#3fa8ae"
            itemTextColor="#434343"
            submitButtonColor="#3fa8ae"
            submitButtonText="Done"
            styleMainWrapper={{
              marginBottom: 20,
              borderWidth: 1,
              borderRadius: 6,
              borderColor: '#C3C3C3',
              position: 'relative',
              paddingHorizontal: 15,
            }}
            styleDropdownMenuSubsection={{
              borderWidth: 0,
              borderRadius: 6,
              borderColor: 'transparent',
              position: 'absolute',
              top: 0,
              width: '100%',
              height: '100%',
            }}
            styleItemsContainer={{
              backgroundColor: 'white',
              borderColor: 'white',
              borderLeftWidth: 0,
            }}
            tagContainerStyle={{
              borderRadius: 6,
              backgroundColor: '#3fa8ae',
              borderColor: '#3fa8ae',
            }}
            removeSelected
          />
          {error === 'hobbiesError' && (
            <Text style={styles.error}>Please select your hobbies</Text>
          )}
          <Stack>
            <FormControl.Label>
              {i18n.t('createProfileStepOneForm.phoneNumber')}
            </FormControl.Label>
            <Input
              defaultValue={newProfileInfo.contact.phoneNumber}
              onChangeText={(text) => handleOnChange(text, 'phoneNumber')}
              keyboardType="numeric"
            />
            {error === 'phoneNumberError' && (
              <Text style={styles.error}>Please enter your phone number</Text>
            )}
          </Stack>
        </Stack>
      </FormControl>
      <Button
        variant="primaryLarge"
        onPress={validate}
        alignSelf="center"
        marginBottom="24px"
      >
        {i18n.t('createProfileStepTwoForm.save')}
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: 'Ubuntu_500Medium',
    lineHeight: 28,
    marginBottom: 10,
    textAlign: 'center',
  },
  container: {
    backgroundColor: 'white',
    marginHorizontal: 0,
    flex: 1,
  },
  image: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Ubuntu_500Medium',
    lineHeight: 18,
    color: '#434343',
    marginBottom: 7,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  error: {
    color: 'red',
  },
});
