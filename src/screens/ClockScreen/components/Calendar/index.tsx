import React from 'react';

import { TouchableOpacity, View } from 'react-native';
import { Text } from '../../../../components/Text/Text';
import Icon from 'react-native-vector-icons/Feather';
import { styles } from './styles';
import { addDays, format } from 'date-fns';

interface CalendarProps {
  onChangeDate: (date: Date) => void;
  currentDate: Date
}

export function Calendar({onChangeDate, currentDate}: CalendarProps) {


  const onPressRight = () => {
      const newDate = addDays(currentDate, 1);
      onChangeDate(newDate);
  };

  const onPressLeft = () => {
      const newDate = addDays(currentDate, -1);
      onChangeDate(newDate);
    };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dayButtonBox} onPress={onPressLeft}>
        <Icon name="chevron-left" size={20} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.currentDateBox}>
        <Text style={styles.currentDateBoxText}>{format(currentDate, 'dd/MM/yyyy')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.dayButtonBox} onPress={onPressRight}>
        <Icon name="chevron-right" size={20} color="#000" />
      </TouchableOpacity>
      {/* <RNCalendar
      onDayPress={day => {
        onChangeDate(new Date(day.timestamp));
      }}

    /> */}
    </View>
 );
}
