import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import { Text } from '../../../../components/Text/Text';
import { styles } from './styles';
import { UserStatus } from '../../../../types/UserStatus';
import { User } from '../../../../types/User';
import firestore from '@react-native-firebase/firestore';

interface CollaboratorItemProps extends TouchableOpacityProps {
  collaborator: User
}

const status: Record<UserStatus, string> = {
  away: 'Ausente',
  working: 'Trabalhando',
};

export function CollaboratorItem({collaborator, ...props}: CollaboratorItemProps) {
  const [currentStatus, setCurrentStatus] = React.useState<UserStatus>('away');

  React.useEffect(() => {
    const subscriber = firestore()
      .collection('collaborators')
      .doc(collaborator.id)
      .onSnapshot(documentSnapshot => {
        const userData = documentSnapshot.data();
        setCurrentStatus(userData?.status);
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [collaborator.id]);
  return (
    <TouchableOpacity style={styles.containerItem} {...props} >
      <Text style={styles.fullNameText} numberOfLines={1}>{collaborator.fullName}</Text>
      <Text bold style={[styles.statusText, styles[currentStatus]]}>{status[currentStatus]}</Text>
    </TouchableOpacity>
  );

}
