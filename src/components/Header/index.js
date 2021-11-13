import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Image,
  Dimensions,
} from 'react-native';
import {LinearProgress, Icon} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import logo from '../../../assets/images/mr_krabs.png';
import {getTimestamp} from '../../constants/helperFns';
import {styles} from './styles';

const SCREENWIDTH = Dimensions.get('screen').width;

export default function Header({popup}) {
  const toast = useToast();
  const dispatch = useDispatch();
  const records = useSelector((state) => state.records[getTimestamp().date]);

  const dailyBudget = useSelector((state) => state.dailyBudget);

  const [amount, setAmount] = useState('');
  const [amountSpent, setAmountSpent] = useState(0);

  const displayMsg = (msg) => {
    toast.show(msg, {
      type: 'success',
      duration: 2000,
    });
  };

  const formPos = useSharedValue(SCREENWIDTH);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: formPos.value}],
    };
  });

  const showForm = () => {
    formPos.value = withTiming(SCREENWIDTH * 0.55, {
      duration: 500,
    });
  };

  const hideForm = () => {
    formPos.value = withTiming(SCREENWIDTH, {
      duration: 500,
    });

    Keyboard.dismiss();
  };

  const addAmount = (val) => {
    if (isNaN(val) === true) {
      displayMsg('Only number are allowed.');
    } else {
      setAmount(val);
    }
  };

  const addBudget = () => {
    if (amount.trim()) {
      dispatch({
        type: 'addBudget',
        payload: amount,
      });
      displayMsg('Updated Budget');
      setAmount('');
      hideForm();
    }

    Keyboard.dismiss();
  };

  const getAmountSpent = () => {
    if (records !== undefined) {
      let totalAmount = records
        .map((record) => record.amount)
        .reduce((total, amount) => parseInt(total) + parseInt(amount));

      setAmountSpent(totalAmount);
    } else {
      setAmountSpent(0);
    }
  };

  const progress = () => {
    if (dailyBudget <= 0) {
      return {
        value: 0,
        percent: 0,
      };
    } else {
      let value = amountSpent / dailyBudget;
      let percent = (value * 100).toFixed(2);

      return {
        value,
        percent,
      };
    }
  };

  const progressColor = () => {
    if (progress().percent <= 75) {
      return '#2dd258';
    } else if (progress().percent < 90) {
      return '#e2ee11';
    } else {
      return 'red';
    }
  };

  const progressStyle = [styles.progress, {color: progressColor()}];

  useEffect(() => {
    if (Number(progress().percent) > 50 && Number(progress().percent) <= 75) {
      popup(
        'Budget Closing In!!!',
        `You have \u20A6${
          dailyBudget - amountSpent
        } remaining to spend today. Spend it wisely.`,
        require('../../../assets/images/mr_krabs.png'),
        '#2f3557',
        7000,
      );
    } else if (
      Number(progress().percent) > 75 &&
      Number(progress().percent) < 100
    ) {
      popup(
        'Budget Closing In FAST!!!',
        `You have \u20A6${
          dailyBudget - amountSpent
        } remaining to spend today. Careful not to exceed your budget!`,
        require('../../../assets/images/mr_krabs.png'),
        'yellow',
        7000,
      );
    } else if (Number(progress().percent) === 100) {
      popup(
        'Budget Reached!!!',
        `You have reached your budget!. That's it for the day. Let's continue tomorrow.`,
        require('../../../assets/images/mr_krabs.png'),
        'red',
        10000,
      );
    } else if (Number(progress().percent) > 100) {
      popup(
        'Me Moneyyyyyy!!!',
        `How dare you exceed your budget!. It had better be worth it. Best to leave it at this for the day. Tomorrow's another day`,
        require('../../../assets/images/app_icon_1.png'),
        'red',
        10000,
      );
    }
  }, [progress().percent]);

  useEffect(() => {
    getAmountSpent();
  }, [records, dailyBudget]);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.titleContainer}>
          <Text allowFontScaling={false} style={styles.title}>
            Krabs
          </Text>
          <Image source={logo} style={styles.logo} />
        </View>
        <Text allowFontScaling={false} style={styles.caption}>
          Spend wisely.
        </Text>
        <Text allowFontScaling={false} style={styles.caption}>
          Make smarter decisions.
        </Text>
      </View>

      <View style={styles.headerRight}>
        <View>
          <Text allowFontScaling={false} style={styles.budgetTitle}>
            Daily Budget
          </Text>
          <Text allowFontScaling={false} style={styles.budget}>
            {'\u20A6'}
            {dailyBudget}
          </Text>
          <LinearProgress
            color={progressColor()}
            value={progress().value}
            variant="determinate"
          />
          <Text allowFontScaling={false} style={progressStyle}>
            {progress().percent}%
          </Text>
        </View>

        <Icon
          name="create-outline"
          type="ionicon"
          size={20}
          color="#0beaaf"
          onPress={showForm}
          iconStyle={{marginLeft: 5}}
        />
      </View>

      {/* Form to add budget */}
      <Animated.View style={[styles.inputFieldContainer, animatedStyle]}>
        <Icon
          name="chevron-forward-outline"
          type="ionicon"
          size={20}
          color="white"
          onPress={hideForm}
          iconStyle={{marginRight: 5}}
        />
        <TextInput
          placeholder="Your budget"
          placeholderTextColor="#ccc"
          value={amount}
          onChangeText={addAmount}
          onSubmitEditing={addBudget}
          maxLength={17}
          returnKeyType="go"
          keyboardType="number-pad"
          style={styles.inputField}
        />

        <TouchableOpacity onPress={addBudget}>
          <Icon
            name="checkmark-circle-outline"
            type="ionicon"
            size={20}
            color="#5c5"
            style={{marginLeft: 5}}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
