import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react'
import { StyleSheet, TextInput, Text, View, TouchableOpacity } from  'react-native'
import { auth } from '../../../firebase'

export const StepOneForm: React.FC = () => {
    // const user = auth.currentUser
    // console.log(user)

    return (
        <View>
            <Text>Your primary information</Text>
            <Text>Primary information is important to keep our community safe, 
                and this is why amigoes makes it mandatory. Don't worry, all sensitive 
                information is not stored by us, and is only used to verify your identity.
            </Text>
        </View>
    )
}