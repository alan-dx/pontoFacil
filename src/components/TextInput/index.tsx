import React, { ComponentProps } from 'react';
import {TextInput as RnTextInput, TextStyle} from 'react-native';
import { $fontSizes } from '../Text/Text';

export function TextInput({style, ...props}: ComponentProps<typeof RnTextInput>) {
  return (
    <RnTextInput style={[$textInputStyle, style]} placeholderTextColor="#303030" {...props} />
  );
}

export const $textInputStyle: TextStyle = {
  padding: 8,
  color: '#000030',
  flexShrink: 1,
  height: 40,
  width: '100%',
  margin: 12,
  borderWidth: 1,
  ...$fontSizes.paragraphMedium,
};

