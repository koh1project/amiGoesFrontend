import { useNavigation } from '@react-navigation/core';
import React, { useRef, useState } from 'react';
import { Text, View } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import { post } from '../../../services/api';
import {
  authUser,
  CREATE_USERPROFILE_ENDPOINT,
} from '../../../services/userProfile.service';
import { PrimaryButton } from '../../buttons/PrimaryButton';
import { Input } from '../../form/Input';
import { useNotificationsToken } from '../../../hooks/useNotificationsToken';

const languagesOptions = [
  {
    id: 'English',
    name: 'English',
  },
  {
    id: 'Spanish',
    name: 'Spanish',
  },
  {
    id: 'French',
    name: 'French',
  },
  {
    id: 'German',
    name: 'German',
  },
  {
    id: 'Italian',
    name: 'Italian',
  },
  {
    id: 'Portuguese',
    name: 'Portuguese',
  },
];

const hobbiesOptions = [
  {
    id: 'Sports',
    name: 'Sports',
  },
  {
    id: 'Music',
    name: 'Music',
  },
  {
    id: 'Reading',
    name: 'Reading',
  },
  {
    id: 'Cooking',
    name: 'Cooking',
  },
  {
    id: 'Dancing',
    name: 'Dancing',
  },
  {
    id: 'Writing',
    name: 'Writing',
  },
  {
    id: 'Art',
    name: 'Art',
  },
  {
    id: 'Photography',
    name: 'Photography',
  },
  {
    id: 'Other',
    name: 'Other',
  },
];

export const StepTwoForm: React.FC = ({ route }) => {
  const { updateNotificationToken } = useNotificationsToken();
  //console.log(user);
  const multiSelect = useRef(null);
  const multiSelectHobbies = useRef(null);
  const [languages, setLanguagesArray] = useState([]);
  const [hobbies, setHobbiesArray] = useState([]);
  const user = authUser();
  const navigation = useNavigation();
  const inputs = route.params;
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

  const handleOnChange = (text, input) => {
    setProfileInfo((prevState) => ({ ...prevState, [input]: text }));
  };

  const onSelectedLanguagesChange = (selectedItems) => {
    const replaceArray = [...languages, ...selectedItems];
    setLanguagesArray(replaceArray);
  };

  const onSelectedHobbiesChange = (selectedItems) => {
    const replaceArray = [...hobbies, ...selectedItems];
    setHobbiesArray(replaceArray);
  };

  const handleOnSubmit = () => {
    const data = {
      ...profileInfo,
      languages: languages,
      hobbies: hobbies,
    };
    createProfile(data);
  };

  const createProfile = async (data) => {
    console.log(data);
    const result = await post(CREATE_USERPROFILE_ENDPOINT.post, data);
    console.log('Response from backend: ', result.data);
    if (result.data) {
      alert('Profile created successfully!');
      updateNotificationToken(); // update send notification token to backend
      navigation.navigate('Index' as never);
    }
  };

  return (
    <View>
      <Text>Talk a bit about yourself</Text>
      <View>
        <Input
          label="Home Coutry"
          placeholder="Ex. Mexico"
          onChangeText={(text) => handleOnChange(text, 'homeCountry')}
        />
        <View>
          <Text>Languages</Text>
        </View>
        <MultiSelect
          hideTags
          items={languagesOptions}
          uniqueKey="id"
          ref={multiSelect}
          onSelectedItemsChange={onSelectedLanguagesChange}
          displayKey="name"
          tagRemoveIconColor="#f8f8f8"
          tagTextColor="#f8f8f8"
          selectedItemTextColor="#3fa8ae"
          selectedItemIconColor="#3fa8ae"
          itemTextColor="#000"
          submitButtonColor="#3fa8ae"
          tagContainerStyle={{
            borderRadius: 10,
            backgroundColor: '#a4a5a3',
            borderColor: '#a4a5a3',
          }}
          submitButtonText="Done"
        />
        <View>
          {multiSelect.current
            ? multiSelect.current.getSelectedItemsExt(languages)
            : null}
        </View>
        <Input
          label="About Me"
          placeholder="Write a bit about yourself"
          onChangeText={(text) => handleOnChange(text, 'bio')}
        />
        <View>
          <Text>Hobbies</Text>
        </View>
        <MultiSelect
          hideTags
          items={hobbiesOptions}
          uniqueKey="id"
          ref={multiSelectHobbies}
          onSelectedItemsChange={onSelectedHobbiesChange}
          displayKey="name"
          tagRemoveIconColor="#f8f8f8"
          tagTextColor="#f8f8f8"
          selectedItemTextColor="#3fa8ae"
          selectedItemIconColor="#3fa8ae"
          itemTextColor="#000"
          submitButtonColor="#3fa8ae"
          tagContainerStyle={{
            borderRadius: 10,
            backgroundColor: '#a4a5a3',
            borderColor: '#a4a5a3',
          }}
          submitButtonText="Done"
        />
        <View>
          {multiSelectHobbies.current
            ? multiSelectHobbies.current.getSelectedItemsExt(hobbies)
            : null}
        </View>
      </View>
      <View>
        <PrimaryButton label="Next" onPress={handleOnSubmit} />
      </View>
    </View>
  );
};
