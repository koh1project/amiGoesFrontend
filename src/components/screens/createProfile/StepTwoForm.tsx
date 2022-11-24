import { useNavigation } from '@react-navigation/core';
import * as ImagePicker from 'expo-image-picker';
import { Button, Text, View } from 'native-base';
import React, { useState } from 'react';
import { Image, Keyboard, ScrollView, StyleSheet } from 'react-native';
import { LooseObject } from '../../../types/models';
import MultiSelect from 'react-native-multiple-select';
import placeholder from '../../../../assets/images/placeholder.png';
import { useNotificationsToken } from '../../../hooks/useNotificationsToken';
import i18n from '../../../localization/Localization';
import { post } from '../../../services/api';
import { CREATE_USERPROFILE_ENDPOINT } from '../../../services/userProfile.service';
import { Input } from '../../form/Input';
import { useAuthContext } from '../../auth/AuthContextProvider';
import { languagesOptions, hobbiesOptions } from '../../../utils/const';

// const languagesOptions = [
//   {
//     id: 'English',
//     name: 'English',
//   },
//   {
//     id: 'Spanish',
//     name: 'Spanish',
//   },
//   {
//     id: 'French',
//     name: 'French',
//   },
//   {
//     id: 'German',
//     name: 'German',
//   },
//   {
//     id: 'Italian',
//     name: 'Italian',
//   },
//   {
//     id: 'Portuguese',
//     name: 'Portuguese',
//   },
// ];

// const hobbiesOptions = [
//   {
//     id: 'Sports',
//     name: 'Sports',
//   },
//   {
//     id: 'Music',
//     name: 'Music',
//   },
//   {
//     id: 'Reading',
//     name: 'Reading',
//   },
//   {
//     id: 'Cooking',
//     name: 'Cooking',
//   },
//   {
//     id: 'Dancing',
//     name: 'Dancing',
//   },
//   {
//     id: 'Writing',
//     name: 'Writing',
//   },
//   {
//     id: 'Art',
//     name: 'Art',
//   },
//   {
//     id: 'Photography',
//     name: 'Photography',
//   },
//   {
//     id: 'Other',
//     name: 'Other',
//   },
// ];

export const StepTwoForm: React.FC = ({ route }) => {
  const { updateNotificationToken } = useNotificationsToken();
  const [languages, setLanguagesArray] = useState([]);
  const [hobbies, setHobbiesArray] = useState([]);
  const { user } = useAuthContext();
  const navigation = useNavigation();
  const inputs = route.params;
  const [image, setImage] = useState(null);
  const [profileInfo, setProfileInfo] = useState({
    _id: user.uid,
    name: inputs.inputs.name,
    birthday: inputs.inputs.birthDate,
    gender: inputs.inputs.gender,
    isVerified: true,
    contact: {
      phoneNumber: inputs.inputs.phoneNumber,
      email: user.email,
    },
    emergencyContact: {
      name: inputs.inputs.emergencyName,
      phoneNumber: inputs.inputs.emergencyPhoneNumber,
      relationship: inputs.inputs.emergencyRelationship,
    },
    languages: languages,
    hobbies: hobbies,
    homeCountry: '',
    bio: '',
  });

  const [errors, setErrors] = useState<LooseObject>({});
  const [isFocused, setIsFocused] = useState(false);

  const handleOnChange = (text, input) => {
    setProfileInfo((prevState) => ({ ...prevState, [input]: text }));
  };

  const onSelectedLanguagesChange = (selectedItems) => {
    setLanguagesArray(selectedItems);
    setProfileInfo((prevState) => ({
      ...prevState,
      languages: selectedItems,
    }));
  };

  const onSelectedHobbiesChange = (selectedItems) => {
    setHobbiesArray(selectedItems);
    setProfileInfo((prevState) => ({
      ...prevState,
      hobbies: selectedItems,
    }));
  };

  const handleOnSubmit = () => {
    const data = {
      ...profileInfo,
      languages: languages,
      hobbies: hobbies,
    };
    validate(data);
    //createProfile(data);
  };

  const validate = (data) => {
    Keyboard.dismiss();
    let valid = true;
    if (!data.homeCountry) {
      handleError('Please enter your home country', 'homeCountry');
      valid = false;
    }

    if (!data.bio) {
      handleError('Please enter your bio', 'bio');
      valid = false;
    }

    if (data.languages.length < 1) {
      handleError('Please select at least one language', 'languages');
      valid = false;
    }

    if (data.hobbies.length < 1) {
      handleError('Please select at least one hobby', 'hobbies');
      valid = false;
    }

    if (valid) {
      createProfile(data);
    }
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const createProfile = async (data) => {
    console.log(data);
    const result = await post(CREATE_USERPROFILE_ENDPOINT.post, data);
    if (result.data) {
      console.log(result);
      alert('Profile created successfully!');
      updateNotificationToken(); // update send notification token to backend
      navigation.navigate('Index' as never);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title} color="green">
        {i18n.t('createProfileStepTwoForm.title')}
      </Text>
      <Text
        textAlign="center"
        marginLeft="50px"
        marginRight="50px"
        marginBottom="21px"
      >
        {i18n.t('createProfileStepTwoForm.subtitle')}
      </Text>

      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Image source={placeholder} style={styles.image} />
      )}

      <Button
        variant="primaryLargeLight"
        alignSelf="center"
        onPress={pickImage}
        marginBottom="25px"
      >
        {i18n.t('createProfileStepTwoForm.uploadPhoto')}
      </Button>

      <View style={{ marginHorizontal: 20 }}>
        <Input
          label={i18n.t('createProfileStepTwoForm.country')}
          placeholder="Ex. Mexico"
          error={errors.homeCountry}
          onFocus={() => {
            handleError(null, 'homeCountry');
          }}
          onChangeText={(text) => handleOnChange(text, 'homeCountry')}
        />
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
          onToggleList={() => {
            handleError(null, 'languages');
            setIsFocused(true);
          }}
          selectedItems={languages}
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
            marginBottom: errors.languages ? 0 : 24,
            borderWidth: 1,
            borderRadius: 6,
            borderColor: errors.languages
              ? 'red'
              : isFocused
              ? '#4c4c4c'
              : '#4c4c4c',
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
        {errors.languages && (
          <Text
            style={{
              color: 'red',
              fontSize: 12,
              fontFamily: 'Ubuntu_500Medium',
              marginBottom: 24,
            }}
          >
            {errors.languages}
          </Text>
        )}
        <Text style={styles.label}>
          {i18n.t('createProfileStepTwoForm.about')}
        </Text>
        <Text marginBottom={-3}>
          {i18n.t('createProfileStepTwoForm.aboutSubtitle')}
        </Text>
        <Input
          placeholder={i18n.t('createProfileStepTwoForm.aboutplaceholder')}
          error={errors.bio}
          onFocus={() => {
            handleError(null, 'bio');
          }}
          onChangeText={(text) => handleOnChange(text, 'bio')}
          label={undefined}
        />
        <View>
          <Text style={styles.label}>Hobbies</Text>
        </View>
        <MultiSelect
          fontFamily="Ubuntu_400Regular"
          fontSize={14}
          items={hobbiesOptions}
          uniqueKey="id"
          onSelectedItemsChange={onSelectedHobbiesChange}
          selectedItems={hobbies}
          onToggleList={() => {
            handleError(null, 'hobbies');
            setIsFocused(true);
          }}
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
            marginBottom: errors.hobbies ? 0 : 24,
            borderWidth: 1,
            borderRadius: 6,
            borderColor: errors.hobbies
              ? 'red'
              : isFocused
              ? '#4c4c4c'
              : '#4c4c4c',
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
        {errors.hobbies && (
          <Text
            style={{
              color: 'red',
              fontSize: 12,
              fontFamily: 'Ubuntu_500Medium',
              marginBottom: 24,
            }}
          >
            {errors.hobbies}
          </Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          variant="primarySmallLight"
          marginRight="6px"
          onPress={navigation.goBack}
        >
          {i18n.t('createProfileStepTwoForm.back')}
        </Button>
        <Button variant="primarySmall" onPress={handleOnSubmit}>
          {i18n.t('createProfileStepTwoForm.next')}
        </Button>
        {/* <PrimaryButton label="Next" onPress={handleOnSubmit} /> */}
      </View>
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
});
