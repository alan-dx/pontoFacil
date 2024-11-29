import { getCollaboratorDoc } from './getCollaboratorDoc';

export const getCurrentRunningClock = (collaboratorId: string) => {
  return getCollaboratorDoc(collaboratorId)!.collection('clocks').where('end', '==', null).get();
};
