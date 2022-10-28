import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react';
import { post } from '../../../services/api';
import { CREATE_USERPROFILE_ENDPOINT } from '../../../services/userProfile.service';
import { StyleSheet, TextInput, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Keyboard, Platform } from 'react-native';
import { PrimaryButton } from '../../buttons/PrimaryButton';
import { Input } from '../../form/Input';
import { authUser } from '../../../services/userProfile.service';

export const StepTwoForm: React.FC = ({ route }) => {
    //console.log(user);
    const user = authUser();
    const navigation = useNavigation();
    const inputs = route.params;
    const [languagesArray, setLanguagesArray] = useState([]);
    const [hobbiesArray, setHobbiesArray] = useState([]);
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
        homeCountry: '',
        languages: [],
        bio: '',
        hobbies: [],
    });

    const handleOnChange = (text, input) => {
        //if ((input === 'homeCountry') || (input === 'bio')) {
            setProfileInfo(prevState => ({...prevState, [input]: text}));
       // }
    }

    const handleHobbiesArray = (text) => {
        setHobbiesArray(prevState => [...prevState, text]);
    }

    const handleLanguagesArray = (text) => {
        setLanguagesArray(prevState => [...prevState, text]);
    }

    const handleOnSubmit = () => {
        setProfileInfo(prevState => ({...prevState, languages: languagesArray}));
        setProfileInfo(prevState => ({...prevState, hobbies: hobbiesArray}));
        console.log(profileInfo);
        createProfile();
    }

    const createProfile = async () => {
        const result = await post(CREATE_USERPROFILE_ENDPOINT.post, profileInfo);
        console.log('Response from backend: ', result.data);
        if (result.data) {
            alert('Profile created successfully!');
            navigation.navigate('Index' as never);
        };
    }

    return (
        <View>
            <Text>Talk a bit about yourself</Text>
            <View>
                <Input 
                    label='Home Coutry' 
                    placeholder='Ex. Mexico' 
                    // error={errors.emergencyName}
                    // onFocus={() => {
                    //     handleError(null, 'homeCountry');
                    // }}
                    onChangeText={text => handleOnChange(text, 'homeCountry')}
                    />
                <Input 
                    label='Languages' 
                    placeholder='Ex. Spanish, English'
                    // error={errors.languages}
                    // onFocus={() => {
                    //     handleError(null, 'languages');
                    // }}
                    onChangeText={text => handleLanguagesArray(text.split(', '))} 
                    />
                <Input 
                    label='About Me' 
                    placeholder='Write a bit about yourself'
                    // error={errors.bio}
                    // onFocus={() => {
                    //     handleError(null, 'bio');
                    // }}
                    onChangeText={text => handleOnChange(text, 'bio')} 
                    />
                <Input 
                    label='Hobbies' 
                    placeholder='Ex. Soccer, Music'
                    // error={errors.bio}
                    // onFocus={() => {
                    //     handleError(null, 'bio');
                    // }}
                    onChangeText={text => handleHobbiesArray(text.split(', '))}
                    />
            </View>
            <View>
                <PrimaryButton
                    label="Next"
                    onPress={handleOnSubmit}
                />
            </View>
        </View>
    )
}