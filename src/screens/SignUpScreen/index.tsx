import React from 'react';
import { Screen } from '../../components/Screen';
import { styles } from './styles';
import { Text } from '../../components/Text/Text';
import { TextInput } from '../../components/TextInput';
import { LargeButton } from '../../components/Button';
import { AuthStackParamsList } from '../../routes/AuthStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RadioGroup from 'react-native-radio-buttons-group';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';

export function SignUpScreen({navigation}: NativeStackScreenProps<AuthStackParamsList, 'SignUpScreen'>) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [selectedId, setSelectedId] = React.useState('1');
  const [companyId, setCompanyId] = React.useState('');

  function goToSignUpPage() {
    navigation.goBack();
  }

  function signUpUser() {
    auth()
    .createUserWithEmailAndPassword(email, confirmPassword)
    .then(() => {
      console.log('User account created & signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        Toast.show({
          type: 'error',
          text1: 'Esse e-mail já esta cadastrado! Tente utilizar outro endereço.',
          position: 'bottom',
        });
      }

      if (error.code === 'auth/invalid-email') {
        Toast.show({
          type: 'error',
          text1: 'E-mail inválido! Insira um e-mail válido.',
          position: 'bottom',
        });
      }

      if (error.code === 'auth/weak-password') {
        Toast.show({
          type: 'error',
          text1: 'Senha muito curta! A senha teve possuir ao menos 6 caracteres.',
          position: 'bottom',
        });
      }

    });
  }

  const radioButtons = React.useMemo(() => ([
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
]), []);


  return (
    <Screen style={styles.container}>
      <Text style={styles.appNameText} preset="headingLarge" bold>
        Ponto Fácil - Cadastro
      </Text>
      <TextInput onChangeText={setEmail} value={email} placeholder="E-mail" autoCapitalize="none"/>
      <TextInput onChangeText={setPassword} value={password} placeholder="Senha" secureTextEntry autoCapitalize="none"/>
      <TextInput onChangeText={setConfirmPassword} value={confirmPassword} placeholder="Confirmar senha" secureTextEntry />
      { selectedId === '2' && <TextInput onChangeText={setCompanyId} value={companyId} placeholder="Código da empresa" secureTextEntry />}
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
      <LargeButton title="Criar conta" containerStyle={{ marginTop: 8 }} onPress={signUpUser}/>
      <LargeButton variant="text" title="Voltar" containerStyle={{ marginTop: 8}} onPress={goToSignUpPage} />
    </Screen>
  );
}

