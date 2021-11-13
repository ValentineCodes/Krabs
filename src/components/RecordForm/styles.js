import {StyleSheet, Dimensions, Platform} from 'react-native';

import {COLORS} from '../../constants/colors';

const SCREENWIDTH = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: SCREENWIDTH,
    bottom: 0,
    padding: 15,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderWidth: 3,
    borderBottomWidth: 0,
    borderColor: '#2f3557',
    backgroundColor: COLORS.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: SCREENWIDTH * 0.05,
    fontWeight: 'bold',
    color: COLORS.header,
  },
  inputField: {
    marginVertical: Platform.OS === 'ios' ? 15 : 10,
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.faintWhite,
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  categoryContainer: {
    width: 110,
    height: 30,
    backgroundColor: COLORS.primary,
    borderBottomWidth: 0.5,
    borderColor: COLORS.faintWhite,
    alignSelf: 'center',
  },
  category: {
    fontSize: 15,
    color: COLORS.secondary,
  },
  dropdownStyle: {backgroundColor: COLORS.primary, borderRadius: 10},
  dropdownRowTextStyle: {color: 'white', fontSize: 15},
  dropdownRowStyle: {borderBottomColor: COLORS.faintWhite},
  addBtn: {
    alignSelf: 'center',
    padding: 10,
    marginTop: 10,
    borderRadius: 15,
  },
});
