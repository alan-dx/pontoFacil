import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

export function LogoutButton(props: TouchableOpacityProps) {
  return (
    <TouchableOpacity {...props} hitSlop={10}>
        <Icon name="log-out" size={20} color="#000" />
    </TouchableOpacity>
  );
}
