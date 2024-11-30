import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CollaboratorsScreen } from '../screens/CollaboratorsScreen';
import { useUser } from '../hooks/useAuth';
import { ClockScreen } from '../screens/ClockScreen';
import { LogoutButton } from '../components/LogoutButton';
import {  } from '../components/Text/Text';

export type AppStackParamsList = {
  CollaboratorsScreen: undefined;
  ClockScreen: {
    collaboratorId: string
  }
}

const Stack = createNativeStackNavigator<AppStackParamsList>();

export function AppStack() {
  const {user, signOut} = useUser();
  return (
    <Stack.Navigator initialRouteName={user?.isCompany ? 'CollaboratorsScreen' : 'ClockScreen'}>
      <Stack.Screen
        name="CollaboratorsScreen"
        component={CollaboratorsScreen}
        options={{
          title: 'Lista de colaboradores',
          headerRight: () => <LogoutButton onPress={signOut} />,
        }}
      />
            <Stack.Screen name="ClockScreen" component={ClockScreen}
        options={{
          title: 'Ponto',
          headerRight: () => <LogoutButton onPress={signOut} />,
        }}
      />
    </Stack.Navigator>
  );
}
