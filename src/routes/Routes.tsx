import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './AuthStack';
import { useUser } from '../hooks/useAuth';
import { AppStack } from './AppStack';

export function Router() {
  const {user} = useUser();
  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
