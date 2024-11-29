import firestore, { Filter } from '@react-native-firebase/firestore';


export const getAllCurrentDayClocks = async (collaboratorId: string, currentDate: Date) => {
  const clocks = await firestore()
  .collection('collaborators')
  .doc(collaboratorId)
  .collection('clocks')
  .where(Filter.and(Filter('end', '!=', null), Filter('day', '==', currentDate.getDate()), Filter('month', '==', currentDate.getMonth() + 1), Filter('year', '==', currentDate.getFullYear())))
  .get();

  return clocks;

};
