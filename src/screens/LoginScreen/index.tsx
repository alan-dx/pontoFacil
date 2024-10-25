import React from 'react';
import { Screen } from '../../components/Screen';
import { styles } from './styles';
import { Text } from '../../components/Text/Text';
import { TextInput } from '../../components/TextInput';
import { LargeButton } from '../../components/Button';

export function LoginScreen() {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <Screen style={styles.container}>
      <Text style={styles.appNameText} preset="headingLarge" bold>
        Ponto Fácil
      </Text>
      <TextInput onChangeText={setEmail} value={email} placeholder="E-mail"/>
      <TextInput onChangeText={setPassword} value={password} placeholder="Senha"/>
      <LargeButton title="Entrar" containerProps={{ style: {marginTop: 8}}} />
      <LargeButton variant="text" title="Criar conta" containerProps={{ style: {marginTop: 8}}}  />
    </Screen>
  );
}
