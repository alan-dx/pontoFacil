import firestore from '@react-native-firebase/firestore';

export const getCollaboratorDoc = (collaboratorId: string) => {
  const collaborator = firestore().collection('collaborators').doc(collaboratorId);
  return collaborator;
};
