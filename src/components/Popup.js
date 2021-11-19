import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  Image,
  Text,
  View,
  Platform,
} from 'react-native';
import Animated, {
  withTiming,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import {COLORS} from '../constants/colors';

const SCREENWIDTH = Dimensions.get('screen').width;

const Popup = ({onRender}) => {
  const [data, setData] = useState({
    title: null,
    msg: '',
    img: require('../../assets/images/app_icon_1.png'),
    color: '',
  });

  const offset = useSharedValue(SCREENWIDTH);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: offset.value}],
    };
  });

  const show = (
    title = null,
    msg = '',
    img = require('../../assets/images/app_icon_1.png'),
    color = '#2f3557',
    duration = 5000,
  ) => {
    setData({
      title,
      msg,
      img,
      color,
    });
    offset.value = withTiming(SCREENWIDTH * 0.3, {
      duration: 600,
    });

    setTimeout(hide, duration);
  };

  const hide = () => {
    offset.value = withTiming(SCREENWIDTH, {
      duration: 600,
    });
  };

  useEffect(() => {
    onRender(show);
  }, []);
  return (
    <Animated.View
      style={[{...styles.container, borderColor: data.color}, animatedStyle]}>
      <View style={styles.contentContainer}>
        {data.title && (
          <Text allowFontScaling={false} style={styles.title}>
            {data.title}
          </Text>
        )}

        <Text allowFontScaling={false} style={styles.msg}>
          {data.msg}
        </Text>
      </View>
      <Image source={data.img} style={styles.img} resizeMode="contain" />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: SCREENWIDTH * 0.7,
    padding: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 1.5,
    borderRightWidth: 0,
    backgroundColor: COLORS.primary,
  },
  contentContainer: {
    flex: 1,
    marginRight: 3,
  },
  title: {
    fontSize: 17,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  msg: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  img: {
    width: 70,
    height: 90,
  },
});

export default Popup;
