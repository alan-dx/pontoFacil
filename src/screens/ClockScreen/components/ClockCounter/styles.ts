import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 50,
    backgroundColor: '#FDFDFD',
  },
  playPauseButton: {
    padding: 4,
    borderRadius: 50,
    backgroundColor: '#F0F0F0',
  },
  currentDateBox: {
    padding: 8,
    borderRadius: 50,
    flex: 1,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    },
});
