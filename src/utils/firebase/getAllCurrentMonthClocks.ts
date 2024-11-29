import firestore, { Filter } from '@react-native-firebase/firestore';


export const getAllCurrentMonthClocks = async (collaboratorId: string, currentDate: Date) => {
  const clocks = await firestore()
  .collection('collaborators')
  .doc(collaboratorId)
  .collection('clocks')
  .where(Filter.and(Filter('end', '!=', null), Filter('month', '==', currentDate.getMonth() + 1), Filter('year', '==', currentDate.getFullYear())))
  .get();

  return clocks;
};
