import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/LoginScreen';
import { SignUpScreen } from '../screens/SignUpScreen';

export type AuthStackParamsList = {
  LoginScreen: undefined;
  SignUpScreen: undefined
}

const Stack = createNativeStackNavigator<AuthStackParamsList>();

export function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen name="LoginScreen" component={LoginScreen}
        options={{
          title: 'Login',
        }}
      />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen}
        options={{
          title: 'Criar conta',
        }}
      />
    </Stack.Navigator>
  );
}
