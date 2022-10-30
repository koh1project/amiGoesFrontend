import { Button, Center, VStack } from 'native-base';

const IconButton = (props) => {
  const { text, action } = props;
  return (
    <Center>
      <VStack space={4} alignItems="center">
        <Button variant="primarySmall" onPress={action}>
          {text}
        </Button>
      </VStack>
    </Center>
  );
};

export default IconButton;
