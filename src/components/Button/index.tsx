import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { Text } from '../Text/Text';

type ButtonVariants = 'contained' | 'outlined' | 'text'

interface LargeButtonProps {
  containerProps?: TouchableOpacityProps,
  title: string,
  variant?: ButtonVariants
}

export function LargeButton({
  containerProps = {},
  title,
  variant = 'contained',
}: LargeButtonProps) {
  const variantStyle = styles[variant];
  const textColor = variant === 'contained' ? { color: '#FFF' } : { color: '#0048ce' };

  return (
    <TouchableOpacity {...containerProps} style={[styles.container, containerProps.style ]} >
      <View style={[styles.buttonBase, variantStyle]}>
        <Text style={[styles.textStyle, textColor]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  buttonBase: {
    height: 40,
    padding: 8,
    alignItems: 'center',
  },
  contained: {
    backgroundColor: '#0048ce',
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#0048ce',
  },
  text: {
    backgroundColor: 'transparent',
  },
  textStyle: {
    textTransform: 'uppercase',
  },
});