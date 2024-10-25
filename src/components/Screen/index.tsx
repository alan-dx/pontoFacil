import React from 'react';
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';
import { styles } from './styles';

export function Screen({children, style, ...props}: SafeAreaViewProps) {
  return (
    <SafeAreaView style={[styles.container, style]} {...props}>
      {children}
    </SafeAreaView>
  );
}
