import React from 'react';
import { Screen } from '../../components/Screen';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { Collaborator } from '../../types/Collaborator';
import { CollaboratorItem } from './components/CollaboratorListItem';

export function CollaboratorsScreen() {

  const collaborators: Collaborator[] = [
    {
      id: '1',
      fullName: 'John Doe',
    },
    {
      id: '2',
      fullName: 'Renato Alberto',
    },
  ];

  function renderItem({item}: ListRenderItemInfo<Collaborator>) {
    return (
      <CollaboratorItem collaborator={item} />
    );
  }

  //TODO: TERMINAR DE INSTALAR a biblioteca de icones

  return (
    <Screen>
      <FlatList
        data={collaborators}
        renderItem={renderItem}
        keyExtractor={({id}) => id}
        style={{
          marginTop: 8,
        }}
      />
    </Screen>
 );
}
