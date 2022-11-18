import { Box, HStack, Text, VStack } from 'native-base';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import CalendarIcon from '../../../assets/icons/calendar-icon-gray.svg';
import ClockIconGray from '../../../assets/icons/clock-icon-gray.svg';
import TrashIcon from '../../../assets/icons/trash-icon.svg';
import { FontFamily, ThemeColors } from '../../theme';
import { PendingRequestResponse } from '../../types/models';

type NotificationItemProps = {
  request: PendingRequestResponse;
};
const NotificationItem = ({ request }: NotificationItemProps) => {
  return (
    <HStack style={styles.container} space={2}>
      <VStack style={styles.contentContainer} space={1}>
        <Text variant="h3" color={'green'}>
          {request.userID2.name}
        </Text>
        <Text>Accepted your Amigoes Request!</Text>
        <HStack space={3}>
          <HStack alignItems={'center'} space={1}>
            <ClockIconGray />
            <Text>11:32 am</Text>
          </HStack>
          <HStack alignItems={'center'} space={1}>
            <CalendarIcon />
            <Text>03- Oct- 22</Text>
          </HStack>
        </HStack>
        <HStack space={2}>
          <TouchableOpacity style={styles.link}>
            <Text style={styles.linkText}>See Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.link}>
            <Text style={styles.linkText}>Add Amigoes</Text>
          </TouchableOpacity>
        </HStack>
      </VStack>
      <Box style={styles.deleteButtonContainer}>
        <TrashIcon />
      </Box>
    </HStack>
  );
};

export default NotificationItem;
const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex: 1,
    borderRadius: 5,
    backgroundColor: ThemeColors.lightgreen,
  },
  link: {
    borderBottomWidth: 2,
    borderBottomColor: ThemeColors.coral,
  },
  linkText: {
    fontFamily: FontFamily.Ubuntu_700Bold,
    color: ThemeColors.coral,
  },
  deleteButtonContainer: {
    padding: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: ThemeColors.danger,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
