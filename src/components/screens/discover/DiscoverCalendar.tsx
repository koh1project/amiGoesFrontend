import moment from 'moment';
import { useEffect, useState } from 'react';
import AmigoCalender from '../../AmigoCalendar/AmigoCalendar';

export const DiscoverCalendar = ({ setDayTo, setDayFrom }) => {
  const [startDay, setStartDay] = useState(null);
  const [endDay, setEndDay] = useState(null);
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    if (startDay && endDay) {
      setDayFrom(startDay);
      setDayTo(endDay);
    } else {
      setDayFrom(null);
      setDayTo(null);
    }
  }, [startDay, endDay]);

  const handleOnPress = (day) => {
    if (startDay && !endDay) {
      const date = {};
      for (
        let d = moment(startDay);
        d.isSameOrBefore(day.dateString);
        d.add(1, 'days')
      ) {
        date[d.format('YYYY-MM-DD')] = {
          marked: true,
          color: 'coral',
          textColor: 'white',
        };

        if (d.format('YYYY-MM-DD') === startDay) {
          date[d.format('YYYY-MM-DD')].startingDay = true;
        }

        if (d.format('YYYY-MM-DD') === day.dateString) {
          date[d.format('YYYY-MM-DD')].endingDay = true;
        }

        switch (d.format('YYYY-MM-DD')) {
          case startDay:
            date[d.format('YYYY-MM-DD')].startingDay = true;
            break;
          case day.dateString:
            date[d.format('YYYY-MM-DD')].endingDay = true;
            break;
          default:
            date[d.format('YYYY-MM-DD')].color = '#C3C3C3';
            break;
        }
      }

      setMarkedDates(date);
      setEndDay(day.dateString);
    } else {
      setStartDay(day.dateString);
      setEndDay(null);
      setMarkedDates({
        [day.dateString]: {
          marked: true,
          color: 'coral',
          textColor: 'white',
          startingDay: true,
          endingDay: true,
        },
      });
    }
  };

  return (
    <AmigoCalender
      initialDate={new Date().toDateString()}
      minDate={new Date().toDateString()}
      markingType="period"
      onDayPress={handleOnPress}
      markedDates={markedDates}
    />
  );
};
