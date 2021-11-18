import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  BackHandler,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';

import {COLORS} from '../constants/colors';

const SCREENWIDTH = Dimensions.get('screen').width;

const ChangePassword = ({navigation}) => {
  const toast = useToast();
  const dispatch = useDispatch();

  const appLock = useSelector((state) => state.appLock);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const displayMsg = (msg, type) => {
    toast.show(msg, {
      type,
      duration: 2000,
    });
  };

  const handleOnSubmitPassword = () => {
    if (currentPassword.trim() === appLock.password && newPassword.trim()) {
      dispatch({
        type: 'updateAppLockPassword',
        payload: newPassword.trim(),
      });

      if (appLock.isDefault) {
        dispatch({
          type: 'updateAppLockIsDefault',
          payload: false,
        });
      }
      navigation.goBack();
      displayMsg('Password Changed Successfully', 'success');
    } else if (currentPassword.trim() && newPassword.trim()) {
      displayMsg('Incorrect Password', 'danger');
    }

    Keyboard.dismiss();
  };

  let addButtonStyle = [
    styles.addBtn,
    {
      backgroundColor:
        currentPassword.trim() && newPassword.trim() ? '#3269ff' : '#2f3557',
    },
  ];

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
    <View style={[styles.container]}>
      <View style={styles.header}>
        <Icon
          name="arrow-back"
          iconStyle={styles.headerIcon}
          onPress={() => navigation.goBack()}
        />
        <Text allowFontScaling={false} style={styles.headerText}>
          Change Password
        </Text>
      </View>

      <KeyboardAvoidingView behavior="position">
        <View style={{marginBottom: 50}}>
          <Icon
            name="lock-closed"
            type="ionicon"
            color="#FFD700"
            size={SCREENWIDTH * 0.2}
          />
        </View>
        <Text style={{...styles.headerText, marginBottom: 50}}>
          Shield your records from prying eyes
        </Text>
        <TextInput
          placeholder="Current Password"
          placeholderTextColor={COLORS.faintWhite}
          value={currentPassword}
          maxLength={15}
          returnKeyType="go"
          style={styles.inputField}
          onChangeText={setCurrentPassword}
          onSubmitEditing={handleOnSubmitPassword}
          secureTextEntry
          autoFocus
        />

        <TextInput
          placeholder="New Password"
          placeholderTextColor={COLORS.faintWhite}
          value={newPassword}
          maxLength={15}
          returnKeyType="go"
          style={styles.inputField}
          onChangeText={setNewPassword}
          onSubmitEditing={handleOnSubmitPassword}
        />

        <View style={addButtonStyle}>
          <Icon
            name="checkmark-done-outline"
            type="ionicon"
            color="white"
            onPress={handleOnSubmitPassword}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 15,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {marginRight: 20, color: 'white'},
  headerText: {
    fontSize: SCREENWIDTH * 0.05,
    fontWeight: 'bold',
    color: COLORS.header,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: 'white',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
  },

  addBtn: {
    alignSelf: 'center',
    padding: 10,
    marginTop: 10,
    borderRadius: 15,
  },
});

export default ChangePassword;
