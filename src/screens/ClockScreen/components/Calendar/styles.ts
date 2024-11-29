import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    marginTop: 16,
  },
  dayButtonBox: {
    backgroundColor: '#FDFDFD',
    padding: 8,
    borderRadius: 50,
  },
  currentDateBox: {
    backgroundColor: '#FDFDFD',
    padding: 8,
    borderRadius: 50,
    flex: 1,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
  },
  currentDateBoxText: {
    fontSize: 14,
    color: '#000',
  },
});
