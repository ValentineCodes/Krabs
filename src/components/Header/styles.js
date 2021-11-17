import {StyleSheet, Dimensions, Platform} from 'react-native';

import {COLORS} from '../../constants/colors';

const SCREENWIDTH = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: Platform.OS === 'ios' ? 15 : 10,
  },
  titleContainer: {flexDirection: 'row', alignItems: 'center'},
  title: {
    fontSize: SCREENWIDTH * 0.05,
    fontWeight: 'bold',
    color: COLORS.header,
    marginTop: -3,
  },
  logo: {width: 20, height: 20, marginLeft: 5, marginBottom: 5},
  caption: {
    fontWeight: 'bold',
    fontSize: SCREENWIDTH * 0.03,
    marginTop: Platform.OS === 'ios' ? 0 : -3,
    color: COLORS.secondary,
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  budgetTitle: {
    fontSize: SCREENWIDTH * 0.04,
    fontWeight: 'bold',
    color: COLORS.header,
  },
  budget: {
    fontWeight: 'bold',
    fontSize: SCREENWIDTH * 0.03,
    marginTop: Platform.OS === 'ios' ? 0 : -1,
    marginVertical: 3,
    color: COLORS.amount,
  },
  inputFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    backgroundColor: COLORS.primary,
    width: SCREENWIDTH * 0.45,
    height: '100%',
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderRadius: 5,
    borderColor: '#2e3356',
    paddingHorizontal: 10,
  },
  inputField: {
    color: COLORS.amount,
    textAlign: 'center',
    flex: 1,
  },
  progress: {
    fontWeight: 'bold',
    fontSize: SCREENWIDTH * 0.03,
    marginTop: Platform.OS === 'ios' ? 3 : 0,
  },
});
