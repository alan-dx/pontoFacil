import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import { Text } from '../../../../components/Text/Text';
import { styles } from './styles';
import { UserStatus } from '../../../../types/UserStatus';
import { User } from '../../../../types/User';

interface CollaboratorItemProps extends TouchableOpacityProps {
  collaborator: User
}

const status: Record<UserStatus, string> = {
  away: 'Ausente',
  working: 'Trabalhando',
};

export function CollaboratorItem({collaborator, ...props}: CollaboratorItemProps) {

  return (
    <TouchableOpacity style={styles.containerItem} {...props} >
      <Text style={styles.fullNameText} numberOfLines={1}>{collaborator.fullName}</Text>
      <Text style={styles.statusText}>{status[collaborator.status || 'away']}</Text>
    </TouchableOpacity>
  );

}
