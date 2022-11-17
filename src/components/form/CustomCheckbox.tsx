import { AddIcon, CloseIcon, HStack, Text } from 'native-base';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

type CustomCheckboxProps = {
  isChecked: boolean;
  value: string;
  title: string;
  onChange: (v: string) => void;
};
const CustomCheckbox = ({
  isChecked,
  value,
  title,
  onChange,
}: CustomCheckboxProps) => {
  const color = isChecked ? 'white' : 'black';
  const bg = isChecked ? 'green' : 'lightgreen';

  return (
    <TouchableOpacity
      style={style.touchableOpacity}
      onPress={() => onChange(value)}
    >
      <HStack space={2} style={style.checkBox} background={bg}>
        <Text variant={'h4'} color={color}>
          {title}
        </Text>
        {isChecked ? (
          <CloseIcon style={{ color }} />
        ) : (
          <AddIcon style={{ color }} />
        )}
      </HStack>
    </TouchableOpacity>
  );
};
const style = StyleSheet.create({
  touchableOpacity: {
    margin: 5,
  },
  checkBox: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    color: 'black',
  },
});
export default CustomCheckbox;
