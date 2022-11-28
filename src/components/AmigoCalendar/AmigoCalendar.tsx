import { Calendar, CalendarProps, LocaleConfig } from 'react-native-calendars';
import i18n from '../../localization/Localization';
import { FontFamily, ThemeColors } from '../../theme';

const AmigoCalendar = (props: CalendarProps) => {
  LocaleConfig.locales['en'] = {
    monthNames: [
      i18n.t('month.january'),
      i18n.t('month.february'),
      i18n.t('month.march'),
      i18n.t('month.april'),
      i18n.t('month.may'),
      i18n.t('month.june'),
      i18n.t('month.july'),
      i18n.t('month.august'),
      i18n.t('month.september'),
      i18n.t('month.october'),
      i18n.t('month.november'),
      i18n.t('month.december'),
    ],
    monthNamesShort: [
      i18n.t('month.januaryShort'),
      i18n.t('month.februaryShort'),
      i18n.t('month.marchShort'),
      i18n.t('month.aprilShort'),
      i18n.t('month.mayShort'),
      i18n.t('month.juneShort'),
      i18n.t('month.julyShort'),
      i18n.t('month.augustShort'),
      i18n.t('month.septemberShort'),
      i18n.t('month.octoberShort'),
      i18n.t('month.novemberShort'),
      i18n.t('month.decemberShort'),
    ],
    dayNames: [
      i18n.t('day.sunday'),
      i18n.t('day.monday'),
      i18n.t('day.tuesday'),
      i18n.t('day.wednesday'),
      i18n.t('day.thursday'),
      i18n.t('day.friday'),
      i18n.t('day.saturday'),
    ],
    dayNamesShort: [
      i18n.t('day.sundayShort'),
      i18n.t('day.mondayShort'),
      i18n.t('day.tuesdayShort'),
      i18n.t('day.wednesdayShort'),
      i18n.t('day.thursdayShort'),
      i18n.t('day.fridayShort'),
      i18n.t('day.saturdayShort'),
    ],
    today: i18n.t('day.today'),
  };
  LocaleConfig.defaultLocale = 'en';

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
