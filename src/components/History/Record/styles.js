import {StyleSheet} from 'react-native';

import {COLORS} from '../../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  dataContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: 10,
  },
  data: {
    marginLeft: 15,
    borderBottomWidth: 0.5,
    borderColor: COLORS.faintWhite,
    paddingBottom: 10,
    flex: 1,
  },
  dataModifierIcons: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  description: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.header,
  },
  category: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.faintWhite,
  },
  amount: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.amount,
  },
  time: {
    color: '#ddd',
    width: 40,
    marginTop: 2,
  },
  msg: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#aaa',
    marginVertical: 20,
  },
});
