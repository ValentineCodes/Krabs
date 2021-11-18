import React, {useEffect, useRef} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, BackHandler} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import Header from '../components/Header/index';
import Chart from '../components/Chart/index';
import History from '../components/History/index';
import RecordForm from '../components/RecordForm/index';
import Popup from '../components/Popup';

import {COLORS} from '../constants/colors';

let showForm;
let hideForm;

let showPopupModal;

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const firstTime = useSelector((state) => state.init);

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

  const showPopup = (title, msg, img, color, duration) => {
    setTimeout(() => {
      showPopupModal(title, msg, img, color, duration);
    }, 2000);
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
    if (firstTime) {
      setTimeout(() => {
        showPopup(
          'Welcome To Krabs!',
          '"You must know where your money is going if you want to build wealth."',
          require('../../assets/images/krabs_1.png'),
          COLORS.amount,
          10000,
        );

        dispatch({
          type: 'updateInit',
          payload: false,
        });
      }, 2000);
    }

    return () => {
      backHandler.remove();
    };
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Header popup={showPopup} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <Chart />
      </ScrollView>

      <History onPressAdd={showRecordForm} navigation={navigation} />

      <RecordForm
        onRender={(show, hide) => {
          showForm = show;
          hideForm = hide;
        }}
        resetFormVisibility={resetFormVisibility}
      />

      <Popup
        onRender={(show) => {
          showPopupModal = show;
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  scrollView: {flex: 1},
});

export default Home;
