import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react';
import SelectList from 'react-native-dropdown-select-list';
import { StyleSheet, TextInput, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Keyboard, Platform } from 'react-native';
import { PrimaryButton } from '../../buttons/PrimaryButton';
import { Input } from '../../form/Input';
import { auth } from '../../../firebase';

export const StepTwoForm: React.FC = ({ route }) => {
    const user = auth.currentUser;
    console.log(user);
    const navigation = useNavigation();
    const inputs = route.params;
    //console.log(inputs);
    const [profileInfo, setProfileInfo] = useState({
        name: inputs.inputs.name,
        birthDate: inputs.inputs.birthDate,
        gender: inputs.inputs.gender,
        contact: {
            phoneNumber: inputs.inputs.phoneNumber,
            email: user.email,
        },
        emergencyContact: {
            emergencyName: inputs.inputs.emergencyName,
            emergencyRelationship: inputs.inputs.emergencyRelationship,
            emergencyPhoneNumber: inputs.inputs.emergencyPhoneNumber,
        },
        homeCountry: '',
        languages: [],
        bio: '',
        hobbies: [],
    });

    console.log('profileInfo: ', profileInfo);

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
                    // onChangeText={text => handleOnChange(text, 'homeCountry')}
                    />
                <Input 
                    label='Languages' 
                    placeholder='Ex. Spanish, English'
                    // error={errors.languages}
                    // onFocus={() => {
                    //     handleError(null, 'languages');
                    // }}
                    // onChangeText={text => handleOnChange(text, 'languages')} 
                    />
                <Input 
                    label='About Me' 
                    placeholder='Write a bit about yourself'
                    // error={errors.bio}
                    // onFocus={() => {
                    //     handleError(null, 'bio');
                    // }}
                    // onChangeText={text => handleOnChange(text, 'bio')} 
                    />
                <Input 
                    label='Hobbies' 
                    placeholder='Ex. Soccer, Music'
                    // error={errors.bio}
                    // onFocus={() => {
                    //     handleError(null, 'bio');
                    // }}
                    // onChangeText={text => handleOnChange(text, 'bio')} 
                    />
            </View>
            <View>
                <PrimaryButton
                    label="Back"
                    //onPress={validate}
                />
                <PrimaryButton
                    label="Next"
                    //onPress={validate}
                />
            </View>
        </View>
    )
}