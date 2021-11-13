import {StyleSheet, Platform} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: Platform.OS === 'ios' ? 1.5 : 1.3,
    padding: Platform.OS === 'ios' ? 15 : 10,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  msg: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#aaa',
    marginVertical: 40,
  },
  noRecords: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
  },
});
