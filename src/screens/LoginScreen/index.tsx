import React from 'react';
import { Screen } from '../../components/Screen';
import { styles } from './styles';
import { Text } from '../../components/Text/Text';
import { TextInput } from '../../components/TextInput';
import { LargeButton } from '../../components/Button';
import { AuthStackParamsList } from '../../routes/AuthStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export function LoginScreen({navigation}: NativeStackScreenProps<AuthStackParamsList, 'LoginScreen'>) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function goToSignUpPage() {
    navigation.navigate('SignUpScreen');
  }

  return (
    <Screen style={styles.container}>
      <Text style={styles.appNameText} preset="headingLarge" bold>
        Ponto Fácil - Login
      </Text>
      <TextInput onChangeText={setEmail} value={email} placeholder="E-mail" keyboardType="email-address"/>
      <TextInput onChangeText={setPassword} value={password} placeholder="Senha"/>
      <LargeButton title="Entrar" containerStyle={{ marginTop: 8 }} />
      <LargeButton variant="text" title="Criar conta" containerStyle={{ marginTop: 8}} onPress={goToSignUpPage} />
    </Screen>
  );
}
