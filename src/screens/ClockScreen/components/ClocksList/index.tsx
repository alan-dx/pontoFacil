import React from 'react';
import { FlatList } from 'react-native';
import { styles } from './styles';
import { Clock } from '../../../../types/Clock';
import { ClockItem } from './components/ClockItem';

interface ClocksListProps {
  clocks: Clock[]
}

export function ClocksList({clocks}: ClocksListProps) {


  return (
      <FlatList
        contentContainerStyle={styles.container}
        data={clocks}
        renderItem={({item}) => {
          return <ClockItem clock={item} />;
        }}
      />
  );
}
