import {StyleSheet, Dimensions, Platform} from 'react-native';

import {COLORS} from '../../constants/colors';

const SCREENWIDTH = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdown: {width: 100, height: 17, backgroundColor: COLORS.primary},
  dropdownText: {fontSize: 13, fontWeight: 'bold', color: COLORS.secondary},
  dropdownStyle: {backgroundColor: COLORS.primary, borderRadius: 10},
  dropdownRowTextStyle: {color: 'white', fontSize: 15},
  dropdownRowStyle: {borderBottomColor: COLORS.faintWhite},
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    marginRight: 15,
    fontWeight: 'bold',
    fontSize: SCREENWIDTH * 0.04,
    color: COLORS.amount,
  },
  avgAmt: {
    fontSize: SCREENWIDTH * 0.03,
  },
  chart: {
    borderRadius: 16,
    backgroundColor: COLORS.tertiary,
    marginVertical: 8,
    marginHorizontal: Platform.OS === 'ios' ? 15 : 10,
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
  },
});
