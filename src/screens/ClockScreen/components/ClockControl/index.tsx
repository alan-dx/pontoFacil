import React from 'react';
import { LargeButton } from '../../../../components/Button';
import { styles } from './styles';

interface ClockControlProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export function ClockControl({isPlaying, onToggle}: ClockControlProps) {

    return (
      <LargeButton title={isPlaying ? 'ENCERRAR' : 'INICIAR'} customButtonStyle={isPlaying ? styles.stopButton : styles.startButton} containerStyle={styles.container} onPress={onToggle} />
    );
  }
