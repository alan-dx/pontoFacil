import React from 'react';
import { Screen } from '../../components/Screen';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { Collaborator } from '../../types/Collaborator';
import { CollaboratorItem } from './components/CollaboratorListItem';
import firestore from '@react-native-firebase/firestore';
import { useUser } from '../../hooks/useAuth';
import { User } from '../../types/User';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamsList } from '../../routes/AppStack';
import { CompanyIdClipButton } from './components/CompanyIdClipButton';

export function CollaboratorsScreen({navigation}: NativeStackScreenProps<AppStackParamsList, 'CollaboratorsScreen'>) {

  const [collaborators, setCollaborators] = React.useState<User[]>([]);

  const {user} = useUser();

  const getCollaborators = React.useCallback(async () => {
    try {
      const collaboratorsData = await firestore().collection('collaborators').where('companyId', '==', user?.id).get();

      const collaboratorsByCompany: User[] = [];


      //!CRIAR UMA ESTRUTURA PRA DIFERENCIAR
      collaboratorsData.docs.forEach(doc => {
        const collaborator = doc.data() as User;
        collaboratorsByCompany.push({
          id: collaborator.id,
          email: collaborator.email,
          fullName: collaborator.fullName,
          isCompany: false,
          status: collaborator.status,
        });
      });

     setCollaborators(collaboratorsByCompany);
    } catch (error) {

    }
  }, [user?.id]);

  React.useEffect(() => {
    getCollaborators();
  }, [getCollaborators]);


  function handleGoToClockScreen(id: string) {
    navigation.navigate('ClockScreen', { userId: id});
  }

  function renderItem({item}: ListRenderItemInfo<Collaborator>) {
    return (
      <CollaboratorItem collaborator={item}  onPress={() => handleGoToClockScreen(item.id)} />
    );
  }

  //TODO: TERMINAR DE INSTALAR a biblioteca de icones

  if (!user) {return null;}

  return (
    <Screen>
      <FlatList
        data={collaborators}
        renderItem={renderItem}
        keyExtractor={({id}) => id}
        style={{
          marginTop: 8,
        }}
        ListHeaderComponent={<CompanyIdClipButton companyId={user?.id} />}
      />
    </Screen>
 );
}
