import { Button, Center, VStack } from 'native-base';

const IconBtn = (props) => {
  const { text, action } = props;
  return (
    <Center>
      <VStack space={4} alignItems="center">
        <Button size="lg" onPress={action}>
          {text}
        </Button>
      </VStack>
    </Center>
  );
};

export default IconBtn;
