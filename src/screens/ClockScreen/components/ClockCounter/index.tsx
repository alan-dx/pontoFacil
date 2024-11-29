import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { styles } from './styles';
import { Text } from '../../../../components/Text/Text';
import { convertSecondsToHMS } from '../../../../utils/convertSecondsToHMS';

interface ClockCounterProps {
  counter: number
}

export function ClockCounter({counter}: ClockCounterProps) {
  const hms = convertSecondsToHMS(counter);
  return (
    <View style={styles.container} >
      <Icon name="clock" size={16} color="#000" />
      <Text bold>{hms}s</Text>
      <View />
    </View>
 );
}
