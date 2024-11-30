import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { Text } from '../../../../../../components/Text/Text';
import { convertSecondsToHMS } from '../../../../../../utils/convertSecondsToHMS';
import { format } from 'date-fns';
import { Clock } from '../../../../../../types/Clock';

interface ClockItemProps {
  clock: Clock
}

export function ClockItem({clock}: ClockItemProps) {

  const {start, end, duration} = clock;

  const hms = convertSecondsToHMS(duration || 0);
  return (
    <View style={styles.container} >
      <View style={styles.startEndBox}>
        <Text>{format(start, 'HH:mm:ss')}</Text>
        <Text>{end && ' - ' + format(end, 'HH:mm:ss')}</Text>
      </View>
      <Text bold >{hms}s</Text>
    </View>
 );
}
