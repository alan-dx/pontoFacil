import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CollaboratorsScreen } from '../screens/CollaboratorsScreen';
import { useUser } from '../hooks/useAuth';
import { ClockScreen } from '../screens/ClockScreen';

export type AppStackParamsList = {
  CollaboratorsScreen: undefined;
  ClockScreen: {
    collaboratorId: string
  }
}

const Stack = createNativeStackNavigator<AppStackParamsList>();

export function AppStack() {
  const {user} = useUser();
  return (
    <Stack.Navigator initialRouteName={user?.isCompany ? 'CollaboratorsScreen' : 'ClockScreen'}>
      <Stack.Screen name="CollaboratorsScreen" component={CollaboratorsScreen}
        options={{
          title: 'Lista de colaboradores',
        }}
      />
            <Stack.Screen name="ClockScreen" component={ClockScreen}
        options={{
          title: 'Ponto',
        }}
      />
    </Stack.Navigator>
  );
}
