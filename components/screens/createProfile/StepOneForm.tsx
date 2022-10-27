import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import SelectList from 'react-native-dropdown-select-list'
import { StyleSheet, TextInput, Text, View, TouchableOpacity, ScrollView } from  'react-native'
import { auth } from '../../../firebase'
import { PrimaryButton } from '../../buttons/PrimaryButton';
import { Input } from '../../form/Input';

export const StepOneForm: React.FC = () => {
    // const user = auth.currentUser
    // console.log(user)
    const navigation = useNavigation();
    // const [name, setName] = useState('');
    // const [birthDate, setBirthDate] = useState('');
    // const [gender, setGender] = useState('');
    // const [phoneNumber, setPhoneNumber] = useState('');
    // const [emergencyName, setEmergencyName] = useState('');
    // const [emergencyRelationship, setEmergencyRelationship] = useState('');
    // const [emergencyPhoneNumber, setEmergencyPhoneNumber] = useState('');
    const [show, setShow] = useState(false);
    const [date, setDate] = useState('');
    const [genderSelected, setGenderSelected] = useState('');

    useEffect(() => {
        onSelectGender(genderSelected)
    }, [genderSelected])

    const [inputs, setInputs] = useState({
        name: '',
        birthDate: '',
        gender: '',
        phoneNumber: '',
        emergencyName: '',
        emergencyRelationship: '',
        emergencyPhoneNumber: '',
    });

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
        const currentDate =;
        setInputs({
            ...inputs,
            birthDate: currentDate,
        });
        setDate(currentDate.toString().);
        setShow(false);
    };

    const validate = () => {
        navigation.navigate('Create Profile: Step 2' as never, {inputs})
    };

    return (
        <ScrollView>
            <Text>Your primary information</Text>
            <Text>Primary information is important to keep our community safe, 
                and this is why amigoes makes it mandatory. Don't worry, all sensitive 
                information is not stored by us, and is only used to verify your identity.
            </Text>
            <View style={{ marginHorizontal: 20 }}>
                <Input label='Name' placeholder='Ex. John Smith' />
                <Text style={{ 
                        fontSize: 16, fontWeight: 'medium', marginBottom: 8, 
                    }}>Birth Date</Text>
                <TouchableOpacity onPress={() => setShow(true)}>
                    <View style={[styles.inputContainer, {borderColor: 'gray', borderWidth: 1}]}>
                        <Text style={styles.input}>{date}</Text>
                    </View>
                </TouchableOpacity>
                {show && (
                <DateTimePicker
                    mode="date"
                    display="default"
                    value={new Date()}
                    minimumDate={new Date(1920, 1, 1)}
                    maximumDate={new Date(2004, 1, 1)}
                    onChange={onDateChange}
                />
                )}
                <View style={{marginBottom: 10}}>
                <Text style={{ 
                        fontSize: 16, fontWeight: 'medium', marginBottom: 8, 
                    }}>Gender</Text>
                <SelectList
                    setSelected={setGenderSelected}
                    data={genderOptions}
                    search={false}
                />
                </View>
                <Input keyboardType="numeric" label='Phone Number' placeholder='Ex. 987 654 3210' />
                <View>
                    <Text>Emergency Contact</Text>
                    <Input label='Name' placeholder='Ex. John Smith' />
                    <Input label='Relationship' placeholder='Ex. Son' />
                    <Input keyboardType="numeric" label='Phone Number' placeholder='Ex. 987 654 3210' />
                </View>
            </View>
            <PrimaryButton
                label="Next"
                onPress={validate}
            />
        </ScrollView>
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