import React from 'react';
import { Screen } from '../../components/Screen';
import { styles } from './styles';
import { Text } from '../../components/Text/Text';
import { TextInput } from '../../components/TextInput';
import { LargeButton } from '../../components/Button';
import { AuthStackParamsList } from '../../routes/AuthStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RadioGroup } from 'react-native-radio-buttons-group';

const radioButtons = [
  {
      id: '1',
      label: 'Empresa',
      value: 'option1',
  },
  {
      id: '2',
      label: 'Colaborador',
      value: 'option2',
  },
];


export function LoginScreen({navigation}: NativeStackScreenProps<AuthStackParamsList, 'LoginScreen'>) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [selectedId, setSelectedId] = React.useState('1');


  function goToSignUpPage() {
    navigation.navigate('SignUpScreen');
  }

  return (
    <Screen style={styles.container}>
      <Text style={styles.appNameText} preset="headingLarge" bold>
        Ponto Fácil - Login
      </Text>
      <TextInput onChangeText={setEmail} value={email} placeholder="E-mail" keyboardType="email-address" autoCapitalize="none" />
      <TextInput onChangeText={setPassword} value={password} placeholder="Senha" />
      <RadioGroup
            radioButtons={radioButtons}
            onPress={(id) => setSelectedId(id)}
            selectedId={selectedId}
            labelStyle={{
              color: '#000030',
            }}
            containerStyle={{
              display: 'flex',
              width: '100%',
              alignItems: 'flex-start',
            }}
            layout="row"
        />
      <LargeButton title="Entrar" containerStyle={{ marginTop: 8 }} />
      <LargeButton variant="text" title="Criar conta" containerStyle={{ marginTop: 8}} onPress={goToSignUpPage} />
    </Screen>
  );
}
