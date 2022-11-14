import { useNavigation } from '@react-navigation/core';
import * as ImagePicker from 'expo-image-picker';
import { Button, Text, View } from 'native-base';
import React, { useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import placeholder from '../../../../assets/images/placeholder.png';
import { useNotificationsToken } from '../../../hooks/useNotificationsToken';
import { post } from '../../../services/api';
import {
  authUser,
  CREATE_USERPROFILE_ENDPOINT,
} from '../../../services/userProfile.service';
import { Input } from '../../form/Input';

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
  const multiSelect = useRef(null);
  const multiSelectHobbies = useRef(null);
  const [languages, setLanguagesArray] = useState([]);
  const [hobbies, setHobbiesArray] = useState([]);
  const user = authUser();
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
        Talk a bit about yourself
      </Text>
      <Text
        textAlign="center"
        marginLeft="50px"
        marginRight="50px"
        marginBottom="21px"
      >
        You can always come back to fill these information later, by clicking on
        Profile.
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
        Add photo
      </Button>

      <View style={{ marginHorizontal: 20 }}>
        <Input
          label="Home country"
          placeholder="Ex. Mexico"
          error={''}
          onChangeText={(text) => handleOnChange(text, 'homeCountry')}
        />
        <View>
          <Text style={styles.label}>Languages</Text>
          <Text marginBottom="12px">
            What languages do you speak? This is how we'll match with amigoes
            that you can share some chit-chat
          </Text>
        </View>
        <MultiSelect
          hideTags
          fontFamily="Ubuntu_400Regular"
          fontSize={14}
          items={languagesOptions}
          uniqueKey="id"
          ref={multiSelect}
          onSelectedItemsChange={onSelectedLanguagesChange}
          selectText="Select languages"
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
        />
        <View>
          {multiSelect.current
            ? multiSelect.current.getSelectedItemsExt(languages)
            : null}
        </View>
        <Text style={styles.label}>About</Text>
        <Text marginBottom={-3}>
          Talk a bit about yourself, your personality, what you like to do in
          your free time.
        </Text>
        <Input
          error={''}
          placeholder="Tell me something about you"
          onChangeText={(text) => handleOnChange(text, 'bio')}
          label={undefined}
        />
        <View>
          <Text style={styles.label}>Hobbies</Text>
        </View>
        <MultiSelect
          hideTags
          fontFamily="Ubuntu_400Regular"
          fontSize={14}
          items={hobbiesOptions}
          uniqueKey="id"
          ref={multiSelectHobbies}
          onSelectedItemsChange={onSelectedHobbiesChange}
          selectText="Select hobbies"
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
        />
        <View>
          {multiSelectHobbies.current
            ? multiSelectHobbies.current.getSelectedItemsExt(hobbies)
            : null}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          variant="primarySmallLight"
          marginRight="6px"
          onPress={navigation.goBack}
        >
          Back
        </Button>
        <Button variant="primarySmall" onPress={handleOnSubmit}>
          Next
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
  },
});
