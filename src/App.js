import React, {useEffect, useRef} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ToastProvider} from 'react-native-toast-notifications';
import RNBootSplash from 'react-native-bootsplash';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

import Home from './screens/Home';
import Settings from './screens/Settings';
import ChangePassword from './screens/ChangePassword';
import LockScreen from './screens/LockScreen';
import Categories from './screens/Categories';

import {COLORS} from './constants/colors';

const Stack = createNativeStackNavigator();

const App = () => {
  const appLock = useSelector((state) => state.appLock);

  useEffect(() => {
    RNBootSplash.hide({fade: true});
  }, []);
  return (
    <SafeAreaProvider>
      <ToastProvider>
        <NavigationContainer>
          <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={COLORS.primary} />

            <Stack.Navigator
              initialRouteName={appLock.enabled ? 'LockScreen' : 'Home'}
              screenOptions={{
                animation: 'slide_from_right',
              }}>
              <Stack.Screen
                name="LockScreen"
                component={LockScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Home"
                component={Home}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Settings"
                component={Settings}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ChangePassword"
                component={ChangePassword}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Categories"
                component={Categories}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
          </SafeAreaView>
        </NavigationContainer>
      </ToastProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  scrollView: {flex: 1},
});
export default App;
