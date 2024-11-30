import React from 'react';

import { Modal, TouchableOpacity, View } from 'react-native';
import { Text } from '../../../../components/Text/Text';
import Icon from 'react-native-vector-icons/Feather';
import { styles } from './styles';
import { addDays, format } from 'date-fns';
import { Calendar as RNCalendar } from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import { theme } from './theme';

LocaleConfig.locales.ptBr = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul.', 'Ago', 'Set', 'Otu', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
  today: 'Hoje',
};

LocaleConfig.defaultLocale = 'ptBr';
interface CalendarProps {
  onChangeDate: (date: Date) => void;
  currentDate: Date
}

export function Calendar({onChangeDate, currentDate}: CalendarProps) {
  const [modalVisible, setModalVisible] = React.useState(false);

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
      <TouchableOpacity style={styles.currentDateBox} onPress={() => setModalVisible(!modalVisible)}>
        <Text style={styles.currentDateBoxText}>{format(currentDate, 'dd/MM/yyyy')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.dayButtonBox} onPress={onPressRight}>
        <Icon name="chevron-right" size={20} color="#000" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onDismiss={() => {
          setModalVisible(!modalVisible);
        }}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <RNCalendar
            markedDates={{
              [format(currentDate, 'yyyy-MM-dd')]: {selected: true, selectedColor: '#0048ce'},
            }}
            onDayPress={(day: any) => {
              onChangeDate(new Date(day.timestamp));
              setModalVisible(false);
            }}
            theme={theme}
            renderHeader={(date: string) => {
              return (
                <View>
                  <Text>{format(date, 'dd/MM/yyyy')}</Text>
                </View>
              );
            }}
          />
        </View>
        </View>
      </Modal>
    </View>
 );
}
