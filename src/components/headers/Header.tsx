import { useNavigation } from '@react-navigation/core';
import { Box, ChevronLeftIcon, HStack, StatusBar, Text } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export const Header: React.FC = () => {
  const navigation = useNavigation();
  return (
    <>
      <StatusBar backgroundColor="#2c3e50" barStyle="light-content" />
      <Box safeAreaTop backgroundColor="#2c3e50">
        <HStack
          bg="#2c3e50"
          py={3}
          alignItems="center"
          justifyContent="space-between"
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <ChevronLeftIcon color="white" size="sm" />
          </TouchableOpacity>
          <Text
            alignSelf="center"
            color="#ffffff"
            fontSize={20}
            fontWeight="bold"
          >
            amiGoes
          </Text>
        </HStack>
      </Box>
    </>
  );
};
