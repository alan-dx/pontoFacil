import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './AuthStack';

export function Router() {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}
