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
            borderWidth: error ? 2 : isFocused ? 2 : 1,
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
        <Text style={{ color: 'red', fontSize: 12, marginBottom: 5 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  labelText: {
    fontSize: 16,
    fontWeight: 'normal',
    marginBottom: 5,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  input: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
});
