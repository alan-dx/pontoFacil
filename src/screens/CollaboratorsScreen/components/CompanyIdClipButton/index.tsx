import React from 'react';
import { Clipboard, View, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import {Text} from '../../../../components/Text/Text';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/Feather';

interface CompanyIdClipButtonProps extends TouchableOpacityProps {
  companyId: string;
}

export function CompanyIdClipButton({companyId}: CompanyIdClipButtonProps) {

  function copyToClipboard() {
    Clipboard.setString(companyId);
  }

  return (
    <TouchableOpacity onPress={copyToClipboard}>
      <View style={styles.container}>
        <View style={styles.companyIdBox}>
          <Icon name="copy" size={15} color="white" />
          <Text style={[styles.text, styles.title]}>Código da empresa:</Text>
        </View>
          <Text style={styles.text}>{companyId}</Text>
      </View>
    </TouchableOpacity>
  );
}
