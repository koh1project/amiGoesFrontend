import {
  Box,
  Button,
  Center,
  HStack,
  Modal,
  Radio,
  ScrollView,
  Text,
  TextArea,
  View,
  VStack,
} from 'native-base';
import React, { useState } from 'react';

const EmergencyScreen = (props) => {
  const { name, naigation } = props.route.params;
  const [value, setValue] = useState('one');
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  return (
    <ScrollView backgroundColor="white">
      <Text variant="screenTitle">My amigoes</Text>
      <View ml={5} mr={5}>
        <Text variant="h3" mb={7}>
          {name}
        </Text>

        <Text variant="h3" color="#3FA8AE" mb={5}>
          Emergency
        </Text>
        <Text variant="body" mb={2}>
          Why are you reporting Parsley Montana?
        </Text>
        <Radio.Group
          name="emergencyRadioGroup"
          value={value}
          onChange={(nextValue) => {
            setValue(nextValue);
          }}
        >
          <Radio value="one" my={1} variant="body">
            <Text variant="body">The person is unconscious</Text>
          </Radio>
          <Radio value="two" my={3} variant="body">
            <Text variant="body" pr={5}>
              This person does offensive, abusive, or illegal action
            </Text>
          </Radio>
          <Radio value="three" my={3} variant="body">
            <Text variant="body">
              This person needs help from his/her emergency contact person
            </Text>
          </Radio>
          <Radio value="four" my={2}>
            <Text variant="body"> The person is injured</Text>
          </Radio>
          <Radio value="five" my={2}>
            <Text variant="body">Others</Text>
          </Radio>
        </Radio.Group>
        <Box>
          <Text variant="body" mt={2}>
            Please write the details here.
          </Text>
          <TextArea
            mt={2}
            aria-label="t1"
            numberOfLines={4}
            placeholder="Please tell me what happened"
            _dark={{
              placeholderTextColor: 'gray.300',
            }}
            mb="5"
          />
        </Box>
        <Box backgroundColor="#FFE4E0" mb={5}>
          <Text variant="body" padding={4} ml={4}>
            amigoes will contact this person and their emergency contact if
            necessary.
          </Text>
        </Box>
        <Center>
          <HStack space={8} mb={10}>
            <View
              mb={5}
              mt={5}
              borderWidth={1.5}
              borderColor="#EE6653"
              borderRadius={30}
              width={150}
            >
              <Text variant="h4" color="#EE6653" pt={5} pb={5} pl={10} pr={10}>
                GO BACK
              </Text>
            </View>

            <View
              mb={5}
              mt={5}
              borderWidth={1.5}
              borderColor="#EE6653"
              borderRadius={30}
              overflow="hidden"
              width={150}
            >
              <Text
                variant="h4"
                color="white"
                pt={5}
                pb={5}
                bg="#EE6653"
                textAlign="center"
                onPress={() => {
                  setShowModal(true);
                }}
              >
                SEND
              </Text>
            </View>
          </HStack>
        </Center>
      </View>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
        <Modal.Content maxWidth="350">
          <Modal.Body>
            <VStack space={3}>
              <Text
                variant="h3"
                color="#3FA8AE"
                ml={5}
                mr={5}
                padding={3}
                textAlign="center"
              >
                Are you sure to send emergency?
              </Text>
              <Button
                onPress={() => {
                  setShowModal2(true);
                  setShowModal(false);
                }}
                ml={10}
                mr={10}
                pt={5}
                pb={5}
                bg="#EE6653"
              >
                YES, SEND
              </Button>
              <Button
                onPress={() => {
                  setShowModal(false);
                }}
                variant="outline"
                colorScheme="#EE6653"
                ml={10}
                mr={10}
                pt={5}
                pb={5}
                borderColor="#EE6653"
              >
                NO, GO BACK
              </Button>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </ScrollView>
  );
};

export default EmergencyScreen;
