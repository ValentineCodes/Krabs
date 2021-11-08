import {StyleSheet} from 'react-native';

import {COLORS} from '../../constants/colors';

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
  amount: {
    marginRight: 15,
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.amount,
  },
  chart: {
    borderRadius: 16,
    backgroundColor: COLORS.tertiary,
    marginVertical: 8,
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
  },
});
