import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Switch,
  BackHandler,
} from 'react-native';
import {Icon} from 'react-native-elements';
import SelectDropdown from 'react-native-select-dropdown';
import {useSelector, useDispatch} from 'react-redux';

import {COLORS} from '../constants/colors';

const CURRENCIES = [
  '\u20A6',
  '\u0024',
  '\u20AC',
  '\u20BF',
  '\u00A2',
  '\u00A3',
  '\u00A5',
  '\u20A0',
  '\u20B1',
  '\u20A8',
  '\u058F',
  '\u060B',
  '\u09F2',
  '\u09F3',
  '\u09FB',
  '\u0AF1',
  '\u0BF9',
  '\u0E3F',
  '\u17DB',
  '\u20A1',
  '\u20A2',
  '\u20A3',
  '\u20A4',
  '\u20A5',
  '\u20A7',
  '\u20A9',
  '\u20AA',
  '\u20AB',
  '\u20AD',
  '\u20AD',
  '\u20AE',
  '\u20AF',
  '\u20B0',
  '\u20B2',
  '\u20B3',
  '\u20B4',
  '\u20B5',
  '\u20B6',
  '\u20B7',
  '\u20B8',
  '\u20B9',
  '\u20BA',
  '\u20BB',
  '\u20BC',
  '\u20BD',
  '\u20BE',
  '\uA838',
  '\uFDFC',
  '\uFE69',
  '\uFF04',
  '\uFFE0',
  '\uFFE1',
  '\uFFE5',
  '\uFFE6',
];
const THEME = ['Dark', 'Light', 'System Default'];

const SCREENWIDTH = Dimensions.get('screen').width;

const Settings = ({navigation}) => {
  const dispatch = useDispatch();

  const appLock = useSelector((state) => state.appLock);
  const currency = useSelector((state) => state.currency);

  const dropdownIcon = () => (
    <Icon
      name="caret-down-outline"
      type="ionicon"
      size={11}
      color={COLORS.secondary}
    />
  );

  const toggleLockSwitch = () =>
    dispatch({
      type: 'updateAppLockEnabled',
      payload: !appLock.enabled,
    });

  const toggleLockMethod = () => {
    dispatch({
      type: 'updateAppLockMethod',
      payload: appLock.method === 'password' ? 'fingerprint' : 'password',
    });
  };

  let appLockIcon = appLock.enabled
    ? 'lock-closed-outline'
    : 'lock-open-outline';

  const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    navigation.goBack();
    return true;
  });

  useEffect(() => {
    return () => {
      backHandler.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon
          name="arrow-back"
          iconStyle={styles.headerIcon}
          onPress={() => navigation.goBack()}
        />
        <Text allowFontScaling={false} style={styles.headerText}>
          Settings
        </Text>
      </View>

      <ScrollView style={{flex: 1}}>
        {/* Currency */}
        <View style={styles.settingContainer}>
          <View style={styles.settingHeader}>
            <Icon
              name="cash-outline"
              type="ionicon"
              color="white"
              style={styles.settingIcon}
            />
            <Text allowFontScaling={false} style={styles.settingTitle}>
              Currency
            </Text>
          </View>
          <SelectDropdown
            data={CURRENCIES}
            defaultValue={currency}
            buttonStyle={styles.categoryContainer}
            buttonTextStyle={styles.category}
            dropdownStyle={styles.dropdownStyle}
            rowTextStyle={styles.dropdownRowTextStyle}
            rowStyle={styles.dropdownRowStyle}
            onSelect={(selectedCurrency, index) =>
              dispatch({
                type: 'updateCurrency',
                payload: selectedCurrency,
              })
            }
            buttonTextAfterSelection={(selectedCurrency, index) =>
              selectedCurrency
            }
            rowTextForSelection={(item, index) => item}
            renderDropdownIcon={dropdownIcon}
          />
        </View>

        {/* Theme */}
        <View style={styles.settingContainer}>
          <View style={styles.settingHeader}>
            <Icon
              name="contrast-outline"
              type="ionicon"
              color="white"
              style={styles.settingIcon}
            />
            <Text allowFontScaling={false} style={styles.settingTitle}>
              Theme
            </Text>
          </View>
          <SelectDropdown
            data={THEME}
            defaultValue={THEME[0]}
            buttonStyle={styles.categoryContainer}
            buttonTextStyle={styles.category}
            dropdownStyle={styles.dropdownStyle}
            rowTextStyle={styles.dropdownRowTextStyle}
            rowStyle={styles.dropdownRowStyle}
            // onSelect={(selectedTheme, index) =>
            //   dispatch({
            //     type: 'updateTheme',
            //     payload: selectedTheme,
            //   })
            // }
            // buttonTextAfterSelection={(selectedTheme, index) =>
            //   selectedTheme
            // }
            // rowTextForSelection={(item, index) => item}
            renderDropdownIcon={dropdownIcon}
          />
        </View>

        {/* Backup */}
        <TouchableOpacity activeOpacity={0.5} style={styles.settingContainer}>
          <View style={styles.settingHeader}>
            <Icon
              name="cloud-upload-outline"
              type="ionicon"
              color="white"
              style={styles.settingIcon}
            />
            <Text allowFontScaling={false} style={styles.settingTitle}>
              Backup Records
            </Text>
          </View>
        </TouchableOpacity>

        {/* App Lock */}
        <View style={styles.settingContainer}>
          <View style={styles.settingHeader}>
            <Icon
              name={appLockIcon}
              type="ionicon"
              color="white"
              style={styles.settingIcon}
            />

            <View>
              <Text allowFontScaling={false} style={styles.settingTitle}>
                Lock Krabs
              </Text>

              <View style={styles.appLockMethodContainer}>
                <Text allowFontScaling={false} style={styles.appLockMethod}>
                  Using {appLock.method}.
                </Text>
                <TouchableOpacity onPress={toggleLockMethod}>
                  <Text
                    style={[
                      styles.appLockMethod,
                      styles.appLockMethodChangeBtn,
                    ]}>
                    Change
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={appLock.enabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleLockSwitch}
            value={appLock.enabled}
          />
        </View>

        {/* App Lock Pin */}
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.settingContainer}
          onPress={() => navigation.navigate('ChangePassword')}>
          <View style={styles.settingHeader}>
            <Icon
              name="lock-closed-outline"
              type="ionicon"
              color="white"
              style={styles.settingIcon}
            />
            <View>
              <Text allowFontScaling={false} style={styles.settingTitle}>
                Change Password
              </Text>

              {appLock.isDefault === true && (
                <View style={styles.appLockMethodContainer}>
                  <Text allowFontScaling={false} style={styles.appLockMethod}>
                    Default: 'Mr.Krabs'
                  </Text>
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>

        {/* Share */}
        <TouchableOpacity activeOpacity={0.5} style={styles.settingContainer}>
          <View style={styles.settingHeader}>
            <Icon
              name="share-social-outline"
              type="ionicon"
              color="white"
              style={styles.settingIcon}
            />
            <Text allowFontScaling={false} style={styles.settingTitle}>
              Share with friends
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingHorizontal: Platform.OS === 'ios' ? 15 : 10,
  },
  header: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {marginRight: 20, color: 'white'},
  headerText: {
    fontSize: SCREENWIDTH * 0.05,
    fontWeight: 'bold',
    color: COLORS.header,
  },

  settingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.3)',
    paddingVertical: 15,
  },
  settingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 15,
    color: 'white',
  },
  settingTitle: {
    fontWeight: 'bold',
    fontSize: SCREENWIDTH * 0.04,
    color: COLORS.header,
  },
  appLockMethodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appLockMethod: {
    fontWeight: 'bold',
    fontSize: SCREENWIDTH * 0.03,
    fontVariant: ['small-caps'],
    color: COLORS.faintWhite,
  },
  appLockMethodChangeBtn: {
    fontStyle: 'italic',
    color: COLORS.secondary,
    marginLeft: 3,
  },

  categoryContainer: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.primary,
    borderBottomWidth: 0.5,
    borderColor: COLORS.faintWhite,
    alignSelf: 'center',
  },
  category: {
    fontSize: SCREENWIDTH * 0.035,
    color: COLORS.secondary,
  },
  dropdownStyle: {backgroundColor: COLORS.primary, borderRadius: 10},
  dropdownRowTextStyle: {color: 'white', fontSize: 12},
  dropdownRowStyle: {borderBottomColor: COLORS.faintWhite},
});

export default Settings;
