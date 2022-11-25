import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const Input = ({ label, error, onFocus = () => {}, ...props }) => {
  const [isFocused, setFocused] = useState(false);

  return (
    <View>
      <Text style={styles.labelText}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error ? 'red' : isFocused ? '#C7F0F2' : 'gray',
            borderWidth: error ? 1 : isFocused ? 2 : 1,
            marginBottom: error ? 0 : 24,
          },
        ]}
      >
        <TextInput
          style={styles.input}
          onFocus={() => {
            onFocus();
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
          {...props}
        />
      </View>
      {error && (
        <Text style={{ color: 'red', fontSize: 12, marginBottom: 24 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  labelText: {
    fontSize: 14,
    fontFamily: 'Ubuntu_500Medium',
    lineHeight: 18,
    marginBottom: 7,
    color: '#434343',
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#C3C3C3',
  },
  input: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
});
