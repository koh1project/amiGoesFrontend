import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react'
import { StyleSheet, TextInput, Text, View, TouchableOpacity } from  'react-native'
import { auth } from '../../../firebase'

export const StepTwoForm: React.FC = ({ route }) => {
    // const user = auth.currentUser
    // console.log(user)
    const navigation = useNavigation();
    const inputs = route.params;
    console.log(inputs);

    return (
        <View>
            <Text>Step Two</Text>
        </View>
    )
}