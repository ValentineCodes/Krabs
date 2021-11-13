import {StyleSheet, Dimensions, Platform} from 'react-native';

import {COLORS} from '../../../constants/colors';

const SCREENWIDTH = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 10 : 5,
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
    fontSize: SCREENWIDTH * 0.04,
    color: COLORS.secondary,
    marginBottom: 5,
  },
  description: {
    fontSize: SCREENWIDTH * 0.04,
    fontWeight: 'bold',
    color: COLORS.header,
  },
  category: {
    fontSize: SCREENWIDTH * 0.03,
    fontWeight: 'bold',
    color: COLORS.faintWhite,
    marginVertical: Platform.OS === 'ios' ? 3 : 0,
  },
  amount: {
    fontSize: SCREENWIDTH * 0.03,
    fontWeight: 'bold',
    color: COLORS.amount,
  },
  time: {
    color: '#ddd',
    width: '15%',
    marginTop: 2,
    fontSize: SCREENWIDTH * 0.03,
  },
  msg: {
    textAlign: 'center',
    fontSize: SCREENWIDTH * 0.04,
    fontWeight: 'bold',
    color: '#aaa',
    marginVertical: 20,
  },
});
