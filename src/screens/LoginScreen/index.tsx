import React from 'react';
import { Screen } from '../../components/Screen';
import { styles } from './styles';
import { Text } from '../../components/Text/Text';
import { TextInput } from '../../components/TextInput';
import { LargeButton } from '../../components/Button';
import { AuthStackParamsList } from '../../routes/AuthStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RadioGroup } from 'react-native-radio-buttons-group';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import firestore from '@react-native-firebase/firestore';
import { useUser } from '../../hooks/useAuth';
import { User } from '../../types/User';

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

  const {setUser} = useUser();

  function goToSignUpPage() {
    navigation.navigate('SignUpScreen');
  }

  function signIn() {
    auth().signInWithEmailAndPassword(
      email,
      password
    ).then(async ({user}) => {
      try {
        const userData = (await firestore().collection(selectedId === '1' ? 'companies' : 'collaborators').doc(user.uid).get()).data() as User;

        setUser({
          email: userData.email,
          id: user.uid,
          isCompany: selectedId === '1',
          fullName: userData.fullName,
        });
      } catch (error) {
        throw {code: 'auth/user-not-found'};
      }

    }).catch(error => {
      console.log('xxx', error);
      if (error.code === 'auth/user-not-found') {
        Toast.show({
          type: 'error',
          text1: 'Usuário não encontrado. Verifique suas credenciais.',
          position: 'bottom',
        });
      }
      if (error.code === 'auth/invalid-credential') {
        Toast.show({
          type: 'error',
          text1: 'Não foi possível realizar o login. Verifique suas credenciais.',
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

    });
  }

  return (
    <Screen style={styles.container}>
      <Text style={styles.appNameText} preset="headingLarge" bold>
        Ponto Fácil - Login
      </Text>
      <TextInput onChangeText={setEmail} value={email} placeholder="E-mail" keyboardType="email-address" autoCapitalize="none" />
      <TextInput onChangeText={setPassword} value={password} placeholder="Senha" secureTextEntry />
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
      <LargeButton title="Entrar" containerStyle={{ marginTop: 8 }} onPress={signIn} />
      <LargeButton variant="text" title="Criar conta" containerStyle={{ marginTop: 8}} onPress={goToSignUpPage}  />
    </Screen>
  );
}
