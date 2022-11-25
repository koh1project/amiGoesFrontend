import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import { SCREEN_NAMES } from '../../../utils/const';
import { useNavigation } from '@react-navigation/core';
import Info from '../../../../assets/icons/info.svg';
import placeholder from '../../../../assets/images/placeholder.png';
import {
  Image,
  Box,
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
import { patch } from '../../../services/api';
import { UPDATE_USERPROFILE_ENDPOINT } from '../../../services/userProfile.service';
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
    updateUserProfile();
  };

  const updateUserProfile = async () => {
    const url = UPDATE_USERPROFILE_ENDPOINT.patch + userId;
    await patch(url, newProfileInfo)
      .then((res) => {
        console.log(res);
        navigation.navigate(SCREEN_NAMES.Profile as never);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <Image
        size="xl"
        source={
          newProfileInfo.profilePicture
            ? newProfileInfo.profilePicture
            : placeholder
        }
        alt="Profile Picture"
        borderRadius={100}
        style={styles.image}
      />
      <FormControl isRequired>
        <Stack space={4} marginBottom="24px">
          <Stack>
            <Text style={styles.label}>
              {i18n.t('createProfileStepOneForm.name')}
            </Text>
            <Input
              defaultValue={newProfileInfo.name}
              onChangeText={(text) => handleOnChange(text, 'name')}
              onFocus={() => setError('')}
              borderColor={error === 'nameError' ? 'red.500' : '#C3C3C3'}
            />
            {error === 'nameError' && (
              <Text style={styles.error}>Please enter your name</Text>
            )}
          </Stack>
          <Stack>
            <Text style={styles.label}>
              {i18n.t('createProfileStepTwoForm.country')}
            </Text>
            <Input
              defaultValue={newProfileInfo.homeCountry}
              onChangeText={(text) => handleOnChange(text, 'homeCountry')}
              onFocus={() => setError('')}
              borderColor={error === 'homeCountryError' ? 'red.500' : '#C3C3C3'}
            />
            {error === 'homeCountryError' && (
              <Text style={styles.error}>Please enter your home country</Text>
            )}
          </Stack>
          <Stack>
            <Text style={styles.label}>
              {i18n.t('createProfileStepOneForm.gender')}
            </Text>
            <Select
              defaultValue={genderSelected}
              onValueChange={(itemValue) => onSelectGender(itemValue)}
              onOpen={() => setError('')}
              borderColor={error === 'genderError' ? 'red.500' : '#C3C3C3'}
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
            onToggleList={() => setError('')}
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
              paddingHorizontal: 8,
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
            <Text style={styles.label}>
              {i18n.t('createProfileStepTwoForm.about')}
            </Text>
            <TextArea
              defaultValue={newProfileInfo.bio}
              onChangeText={(text) => handleOnChange(text, 'bio')}
              onFocus={() => setError('')}
              borderColor={error === 'bioError' ? 'red.500' : '#C3C3C3'}
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
            onToggleList={() => setError('')}
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
              paddingHorizontal: 8,
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
            <Text style={styles.label}>
              {i18n.t('createProfileStepOneForm.phoneNumber')}
            </Text>
            <Input
              defaultValue={newProfileInfo.contact.phoneNumber}
              onChangeText={(text) => handleOnChange(text, 'phoneNumber')}
              onFocus={() => setError('')}
              borderColor={error === 'phoneNumberError' ? 'red.500' : '#C3C3C3'}
              keyboardType="numeric"
            />
            {error === 'phoneNumberError' && (
              <Text style={styles.error}>Please enter your phone number</Text>
            )}
          </Stack>
        </Stack>
      </FormControl>
      <Box backgroundColor="lightcoral" style={styles.disclaimer}>
        <Info width={24} height={24} />
        <Text variant="disclaimer" marginLeft={11} marginRight={18}>
          {i18n.t('createProfileStepOneForm.disclaimerID')}
        </Text>
      </Box>
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
    fontFamily: 'Ubuntu_500Medium',
    fontSize: 24,
    lineHeight: 28,
    color: '#3fa8ae',
    marginBottom: 18,
  },
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    flex: 1,
  },
  image: {
    alignSelf: 'center',
    marginBottom: 13,
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
    fontSize: 12,
    fontFamily: 'Ubuntu_500Medium',
  },
  disclaimer: {
    padding: 14,
    borderRadius: 6,
    flexDirection: 'row',
    marginBottom: 24,
  },
});
