import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import { AuthStack, AuthStackParamsList } from './AuthStack';

type MainStackParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamsList>
}

const Stack = createNativeStackNavigator<MainStackParamList>();

export function MainStack() {
  return (
    <Stack.Navigator initialRouteName="AuthStack" >
      <Stack.Screen name="AuthStack" component={AuthStack} />
    </Stack.Navigator>
  );
}
