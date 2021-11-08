import {StyleSheet, Dimensions} from 'react-native';

import {COLORS} from '../../constants/colors';

const SCREENWIDTH = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  titleContainer: {flexDirection: 'row', alignItems: 'center'},
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    color: COLORS.header,
    marginTop: -3,
  },
  logo: {width: 20, height: 20, marginLeft: 5, marginBottom: 5},
  caption: {
    fontWeight: 'bold',
    marginTop: -5,
    color: COLORS.secondary,
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  budgetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.header,
  },
  budget: {
    fontWeight: 'bold',
    marginTop: -3,
    color: COLORS.amount,
  },
  inputFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: 10,
    backgroundColor: COLORS.primary,
    width: SCREENWIDTH * 0.45,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderRadius: 5,
    borderColor: '#2e3356',
  },
  inputField: {
    color: COLORS.amount,
    textAlign: 'center',
    flex: 1,
  },
  progress: {
    fontWeight: 'bold',
    fontSize: 12,
  },
});
