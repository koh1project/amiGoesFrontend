import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectList from 'react-native-dropdown-select-list';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Keyboard, Platform } from 'react-native';
import { PrimaryButton } from '../../buttons/PrimaryButton';
import { Input } from '../../form/Input';

export const StepOneForm: React.FC = () => {
    const navigation = useNavigation();
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());
    const [text, setText] = useState('');
    const [genderSelected, setGenderSelected] = useState('');

    const [inputs, setInputs] = useState({
        name: '',
        birthDate: '',
        gender: '',
        phoneNumber: '',
        emergencyName: '',
        emergencyRelationship: '',
        emergencyPhoneNumber: '',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        onSelectGender(genderSelected)
    }, [genderSelected])

    const genderOptions = [
        { key: 'male', value: 'Male'},
        { key: 'female', value: 'Female'},
        { key: 'other', value: 'Other'},
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

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        setText(fDate);

        console.log("Formatted Date: " + fDate);

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
            handleError('Please enter your emergency contact relationship', 'emergencyRelationship');
            valid = false;
        }

        if (!inputs.emergencyPhoneNumber) {
            handleError('Please enter your emergency contact phone number', 'emergencyPhoneNumber');
            valid = false;
        }

        if (valid) {
            navigation.navigate('Create Profile: Step 2' as never, {inputs})
        }
    };

    const handleOnChange = (text, input) => {
        setInputs(prevState => ({...prevState, [input]: text}));
    }

    const handleError = (errorMessage, input) => {
        setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
    }

    return (
        <SafeAreaView>
        <ScrollView>
            <Text>Your primary information</Text>
            <Text>Primary information is important to keep our community safe, 
                and this is why amigoes makes it mandatory. Don't worry, all sensitive 
                information is not stored by us, and is only used to verify your identity.
            </Text>
            <View style={{ marginHorizontal: 20 }}>
                <Input 
                    label='Name' 
                    placeholder='Ex. John Smith' 
                    error={errors.name}
                    onFocus={() => {
                        handleError(null, 'name');
                    }}
                    onChangeText={text => handleOnChange(text, 'name')}/>
                <Text style={{ 
                        fontSize: 16, fontWeight: 'medium', marginBottom: 8, 
                    }}>Birth Date</Text>
                <TouchableOpacity onPress={() => setShow(true)}>
                    <View style={[styles.inputContainer, {borderColor: errors.birthDate ? 'red' : 'gray', borderWidth: 1}]}>
                        <Text style={styles.input}>{text}</Text>
                    </View>
                    {errors.birthDate && <Text style={{color: 'red'}}>{errors.birthDate}</Text>}
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
                <View style={{marginBottom: 10}} >
                <Text style={{ 
                        fontSize: 16, fontWeight: 'medium', marginBottom: 8, 
                    }}>Gender</Text>
                <View style={[styles.inputContainer, {borderColor: errors.gender ? 'red' : 'gray', borderWidth: 1}]}>
                <SelectList
                    setSelected={setGenderSelected}
                    data={genderOptions}
                    search={false}
                />
                </View>
                {errors.gender && <Text style={{color: 'red'}}>{errors.gender}</Text>}
                </View>
                <Input 
                    keyboardType="numeric" 
                    label='Phone Number' 
                    placeholder='Ex. 987 654 3210'
                    error={errors.phoneNumber}
                    onFocus={() => {
                        handleError(null, 'phoneNumber');
                    }}
                    onChangeText={text => handleOnChange(text, 'phoneNumber')}/>
                <View>
                    <Text>Emergency Contact</Text>
                    <Input 
                        label='Name' 
                        placeholder='Ex. John Smith' 
                        error={errors.emergencyName}
                        onFocus={() => {
                            handleError(null, 'emergencyName');
                        }}
                        onChangeText={text => handleOnChange(text, 'emergencyName')}/>
                    <Input 
                        label='Relationship' 
                        placeholder='Ex. Son'
                        error={errors.emergencyRelationship}
                        onFocus={() => {
                            handleError(null, 'emergencyRelationship');
                        }}
                        onChangeText={text => handleOnChange(text, 'emergencyRelationship')} />
                    <Input 
                        keyboardType="numeric" 
                        label='Phone Number' 
                        placeholder='Ex. 987 654 3210'
                        error={errors.emergencyPhoneNumber}
                        onFocus={() => {
                            handleError(null, 'emergencyPhoneNumber');
                        }}
                        onChangeText={text => handleOnChange(text, 'emergencyPhoneNumber')} />
                </View>
            </View>
            <PrimaryButton
                label="Next"
                onPress={validate}
            />
        </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
    input: {
        paddingHorizontal: 24,
        paddingVertical: 12,
    }
})