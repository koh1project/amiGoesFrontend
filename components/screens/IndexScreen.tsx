import React from 'react'
import { useNavigation } from '@react-navigation/core'
import { TouchableOpacity, Text, View } from 'react-native'
import { auth } from '../../firebase'

const IndexScreen = () => {
    auth.currentUser.getIdToken(true).then(idToken => {
        console.log(idToken);
    }).catch(error => {
        console.log(error);
    })

    const navigation = useNavigation()

    const handleSignout = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace('Login')
            })
            .catch(error => alert(error.message))
    }

    return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity
                        onPress={handleSignout} 
                    >
                        <Text>LOG OUT</Text>
                    </TouchableOpacity>
        </View>
    )
}

export default IndexScreen