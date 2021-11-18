import {StyleSheet, Dimensions, Platform} from 'react-native';

import {COLORS} from '../../constants/colors';

const SCREENWIDTH = Dimensions.get('screen').width;
const SCREENHEIGHT = Dimensions.get('screen').height;

export const styles = StyleSheet.create({
  formWrapper: {
    position: 'absolute',
    top: 0,
    width: SCREENWIDTH,
    height: SCREENHEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    width: SCREENWIDTH,
    height: SCREENHEIGHT * 0.35,
    padding: 15,
    borderRadius: 20,
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
