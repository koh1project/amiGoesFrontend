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
import i18n from '../../../localization/Localization';

const EmergencyScreen = (props) => {
  const { name, naigation } = props.route.params;
  const [value, setValue] = useState('one');
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  return (
    <ScrollView backgroundColor="white">
      <Text variant="screenTitle">{i18n.t('EmergencyScreen.title')}</Text>
      <View ml={5} mr={5}>
        <Text variant="h3" mb={7}>
          {name}
        </Text>

        <Text variant="h3" color="#3FA8AE" mb={5}>
          {i18n.t('EmergencyScreen.Emergency')}
        </Text>
        <Text variant="body" mb={2}>
          {i18n.t('EmergencyScreen.RadioQuestion')} Parsley Montana?
        </Text>
        <Radio.Group
          name="emergencyRadioGroup"
          value={value}
          onChange={(nextValue) => {
            setValue(nextValue);
          }}
        >
          <Radio value="one" my={1} variant="body">
            <Text variant="body">{i18n.t('EmergencyScreen.Radio1')}</Text>
          </Radio>
          <Radio value="two" my={3} variant="body">
            <Text variant="body" pr={5}>
              {i18n.t('EmergencyScreen.Radio2')}
            </Text>
          </Radio>
          <Radio value="three" my={3} variant="body">
            <Text variant="body">{i18n.t('EmergencyScreen.Radio3')}</Text>
          </Radio>
          <Radio value="four" my={2}>
            <Text variant="body">{i18n.t('EmergencyScreen.Radio4')} </Text>
          </Radio>
          <Radio value="five" my={2}>
            <Text variant="body">{i18n.t('EmergencyScreen.Radio5')}</Text>
          </Radio>
        </Radio.Group>
        <Box>
          <Text variant="body" mt={2}>
            {i18n.t('EmergencyScreen.TextArea')}
          </Text>
          <TextArea
            mt={2}
            aria-label="t1"
            numberOfLines={4}
            placeholder={i18n.t('EmergencyScreen.TextAreaPlaceHolder')}
            _dark={{
              placeholderTextColor: 'gray.300',
            }}
            mb="5"
          />
        </Box>
        <Box backgroundColor="#FFE4E0" mb={5}>
          <Text variant="body" padding={4} ml={4}>
            {i18n.t('EmergencyScreen.WarningMessage')}
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
                {i18n.t('EmergencyScreen.GoBack')}
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
                {i18n.t('EmergencyScreen.Send')}
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
                {i18n.t('EmergencyScreen.PopupWarning')}
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
                {i18n.t('EmergencyScreen.PopupYes')}
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
                {i18n.t('EmergencyScreen.PopupNo')}
              </Button>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </ScrollView>
  );
};

export default EmergencyScreen;
