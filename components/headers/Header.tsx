import { Box, HStack, StatusBar, Text, ChevronLeftIcon } from 'native-base';

export const Header: React.FC = () => {
  return (
    <>
      <StatusBar backgroundColor="#2c3e50" barStyle="light-content" />
      <Box safeAreaTop backgroundColor="#2c3e50">
        <HStack bg="#2c3e50" py={3} alignItems="center" justifyContent="center">
          <ChevronLeftIcon color="white" size="sm" />
          <Text color="#ffffff" fontSize={20} fontWeight="bold">
            amiGoes
          </Text>
        </HStack>
      </Box>
    </>
  );
};
