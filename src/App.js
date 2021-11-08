import React, {useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  BackHandler,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ToastProvider} from 'react-native-toast-notifications';
// import RNBootSplash from 'react-native-bootsplash';

import Header from './components/Header/index';
import Chart from './components/Chart/index';
import History from './components/History/index';
import RecordForm from './components/RecordForm/index';

import {COLORS} from './constants/colors';

let showForm;
let hideForm;

const App = () => {
  let isFormOpen = useRef(false);

  const showRecordForm = (
    date = '',
    id = '',
    description = '',
    category = '',
    amount = '',
    action = 'addRecord',
  ) => {
    isFormOpen.current = true;
    showForm(date, id, description, category, amount, action);
  };

  const resetFormVisibility = () => {
    isFormOpen.current = false;
  };

  const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    if (isFormOpen.current) {
      hideForm();
    } else {
      BackHandler.exitApp();
    }

    return true;
  });

  useEffect(() => {
    // RNBootSplash.hide({fade: true});

    return () => {
      backHandler.remove();
    };
  }, []);
  return (
    <SafeAreaProvider>
      <ToastProvider>
        <SafeAreaView style={styles.container}>
          <Header />

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}>
            <Chart />
          </ScrollView>

          <History onPressAdd={showRecordForm} />

          <RecordForm
            onRender={(show, hide) => {
              showForm = show;
              hideForm = hide;
            }}
            resetFormVisibility={resetFormVisibility}
          />
        </SafeAreaView>
      </ToastProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 15,
  },
  scrollView: {flex: 1},
});
export default App;
