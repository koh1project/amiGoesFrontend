import { Button, Center, VStack } from 'native-base';

const IconBtn = (props) => {
  const { text } = props;
  return (
    <Center>
      <VStack space={4} alignItems="center">
        <Button size="lg">{text}</Button>
      </VStack>
    </Center>
  );
};

export default IconBtn;
