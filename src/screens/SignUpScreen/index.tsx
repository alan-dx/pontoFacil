import React from 'react';
import { Screen } from '../../components/Screen';
import { styles } from './styles';
import { Text } from '../../components/Text/Text';
import { TextInput } from '../../components/TextInput';
import { LargeButton } from '../../components/Button';
import { AuthStackParamsList } from '../../routes/AuthStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export function SignUpScreen({navigation}: NativeStackScreenProps<AuthStackParamsList, 'SignUpScreen'>) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  function goToSignUpPage() {
    navigation.goBack();
  }

  return (
    <Screen style={styles.container}>
      <Text style={styles.appNameText} preset="headingLarge" bold>
        Ponto Fácil - Cadastro
      </Text>
      <TextInput onChangeText={setEmail} value={email} placeholder="E-mail"/>
      <TextInput onChangeText={setPassword} value={password} placeholder="Senha" secureTextEntry/>
      <TextInput onChangeText={setConfirmPassword} value={confirmPassword} placeholder="Confirmar senha" secureTextEntry />
      <LargeButton title="Criar conta" containerStyle={{ marginTop: 8 }} />
      <LargeButton variant="text" title="Voltar" containerStyle={{ marginTop: 8}} onPress={goToSignUpPage} />
    </Screen>
  );
}
