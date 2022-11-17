import { Calendar, CalendarProps } from 'react-native-calendars';
import { FontFamily, ThemeColors } from '../../theme';

const AmigoCalendar = (props: CalendarProps) => {
  return (
    <Calendar
      theme={{
        calendarBackground: ThemeColors.light,
        textDisabledColor: ThemeColors.gray,
        dayTextColor: ThemeColors.dark,
        selectedDayBackgroundColor: ThemeColors.coral,
        arrowColor: ThemeColors.green,
        todayTextColor: ThemeColors.green,
        textSectionTitleColor: ThemeColors.dark,
        textDayFontFamily: FontFamily.Ubuntu_500Medium,
        textMonthFontFamily: FontFamily.Ubuntu_500Medium,
        textDayHeaderFontFamily: FontFamily.Ubuntu_400Regular,
      }}
      {...props}
    />
  );
};

export default AmigoCalendar;
