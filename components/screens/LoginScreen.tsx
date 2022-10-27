import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react'
import { StyleSheet, TextInput, Text, View, TouchableOpacity } from  'react-native'
import { auth } from '../../firebase'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate('Index')
            }
        })
        return unsubscribe
    }, [])

    const handleLogin = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user
            })
            .catch(error => alert("Invalid email or password"))
    }

    return (
        <View
            style={styles.container}
            behavior='padding'>
            <View style={styles.inputContainer}>
                <Text style={styles.text}>Email</Text>
                <TextInput
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                />
                <Text style={styles.text}>Password</Text>
                 <TextInput 
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.button}    
                >
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 15, color: 'gray', marginTop: 5}}>New on AmiGoes? </Text>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('Signup') }}
                        style={styles.buttonOutline}    
                    >
                        <Text style={styles.buttonTextOutline}>Create Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '90%',
        marginBottom: 20,
    },
    text: {
        fontSize: 20,
        fontWeight: '700',
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        marginBottom: 20,
    },
    buttonContainer: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
    },
    button: {
        backgroundColor: 'gray',
        width: '100%',
        padding: 10,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 10
    },
    buttonOutline: {
        marginTop: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 20,
    },
    buttonTextOutline: {
        color: 'gray',
        fontWeight: '700',
        fontSize: 16,
        textDecorationLine: 'underline'
    }
})