import {StyleSheet} from 'react-native';

import {COLORS} from '../../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    color: COLORS.header,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdown: {width: 110, height: 20, backgroundColor: COLORS.primary},
  dropdownText: {fontSize: 13, fontWeight: 'bold', color: COLORS.secondary},
  dropdownStyle: {backgroundColor: COLORS.primary, borderRadius: 10},
  dropdownRowTextStyle: {color: 'white', fontSize: 15},
  dropdownRowStyle: {borderBottomColor: COLORS.faintWhite},
  addBtn: {
    marginLeft: 15,
    paddingHorizontal: 5,
    paddingVertical: 3,
    backgroundColor: '#2f3557',
    borderRadius: 10,
  },
});
