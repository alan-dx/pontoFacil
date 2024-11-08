import React from 'react';
import {TouchableOpacity} from 'react-native';
import { Collaborator } from '../../../../types/Collaborator';
import { Text } from '../../../../components/Text/Text';
import { styles } from './styles';

interface CollaboratorItemProps {
  collaborator: Collaborator
}

export function CollaboratorItem({collaborator}: CollaboratorItemProps) {
  return (
    <TouchableOpacity style={styles.containerItem}>
      <Text style={styles.fullNameText} numberOfLines={1}>{collaborator.fullName}</Text>
      <Text style={styles.statusText} >Trabalhando</Text>
    </TouchableOpacity>
  );

}
