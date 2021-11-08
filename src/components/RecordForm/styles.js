import {StyleSheet, Dimensions} from 'react-native';

import {COLORS} from '../../constants/colors';

const SCREENWIDTH = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: SCREENWIDTH,
    bottom: 0,
    paddingHorizontal: 15,
    paddingVertical: 15,
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
    fontSize: 23,
    fontWeight: 'bold',
    color: COLORS.header,
  },
  inputField: {
    marginTop: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.faintWhite,
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  categoryContainer: {
    width: 110,
    height: 30,
    marginTop: 5,
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
