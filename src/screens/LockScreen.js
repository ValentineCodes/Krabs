import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  Dimensions,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';

import {COLORS} from '../constants/colors';

const SCREENWIDTH = Dimensions.get('screen').width;

const LockScreen = ({navigation}) => {
  const toast = useToast();

  const appLock = useSelector((state) => state.appLock);

  const [password, setPassword] = useState('');

  const displayMsg = (msg, type) => {
    toast.show(msg, {
      type,
      duration: 2000,
    });
  };

  const handleOnSubmit = () => {
    if (password.trim() === appLock.password) {
      navigation.navigate('Home');
      Keyboard.dismiss();
    } else if (password.trim()) {
      displayMsg('Incorrect Password', 'danger');
    }
  };

  let addButtonStyle = [
    styles.addBtn,
    {
      backgroundColor: password.trim() ? '#3269ff' : '#2f3557',
    },
  ];

  return (
    <View style={[styles.container]}>
      <View style={{marginBottom: 50, marginTop: -150}}>
        <Icon
          name="lock-closed"
          type="ionicon"
          color="#FFD700"
          size={SCREENWIDTH * 0.2}
        />
      </View>
      <Text style={{...styles.headerText, marginBottom: 50}}>Are you YOU?</Text>

      <TextInput
        placeholder="What's your password?"
        placeholderTextColor={COLORS.faintWhite}
        value={password}
        maxLength={15}
        returnKeyType="go"
        style={styles.inputField}
        onChangeText={setPassword}
        onSubmitEditing={handleOnSubmit}
      />

      <View style={addButtonStyle}>
        <Icon
          name="checkmark-done-outline"
          type="ionicon"
          color="white"
          onPress={handleOnSubmit}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default LockScreen;
