import React, {useState, useEffect, useRef} from 'react';
import {View, Text, TextInput, Keyboard, Dimensions} from 'react-native';
import {Icon} from 'react-native-elements';
import SelectDropdown from 'react-native-select-dropdown';
import {useDispatch} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import {getTimestamp} from '../../constants/helperFns';

import {styles} from './styles';

import {COLORS} from '../../constants/colors';

const CATEGORIES = [
  'Category',
  'Food',
  'Transport',
  'Relationship',
  'Leisure',
  'Business',
  'Utilities',
  'Health',
  'Savings',
  'Personal',
  'Miscellaneous',
];

const SCREENHEIGHT = Dimensions.get('screen').height;

export default ({onRender, resetFormVisibility}) => {
  const toast = useToast();
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  let recordDate = useRef('');
  let recordId = useRef('');

  const displayMsg = (msg) => {
    toast.show(msg, {
      type: 'success',
      duration: 2000,
    });
  };

  const offset = useSharedValue(SCREENHEIGHT);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: offset.value}],
      opacity: opacity.value,
    };
  });

  const showForm = (date, id, description, category, amount, action) => {
    offset.value = withTiming(0, {
      duration: 500,
    });
    opacity.value = withTiming(1, {
      duration: 700,
    });

    if (action === 'addRecord') {
      recordId.current = '';
      setIsEditing(false);
      setCategory('Category');
      setDescription('');
      setAmount('');
    } else {
      setIsEditing(true);
      setDescription(description);
      setCategory(category);
      setAmount(amount);
      recordDate.current = date;
      recordId.current = id;
    }
  };

  const hideForm = () => {
    offset.value = withTiming(SCREENHEIGHT, {
      duration: 500,
    });
    opacity.value = withTiming(0, {
      duration: 700,
    });

    Keyboard.dismiss();
    setIsFormVisible(false);
    setIsEditing(false);
    setDescription('');
    setCategory('');
    setAmount('');
    recordDate.current = '';
    recordId.current = '';
    resetFormVisibility();
  };

  const addAmount = (val) => {
    if (isNaN(val) === true) {
      displayMsg('Positive numbers only.');
    } else {
      setAmount(val);
    }
  };

  const addRecord = () => {
    Keyboard.dismiss();

    if (amount > 0) {
      const d = getTimestamp();

      if (!recordId.current) {
        dispatch({
          type: 'addRecord',
          payload: {
            date: d.date,
            exp: {
              description,
              category,
              amount,
              time: d.time,
            },
          },
        });

        displayMsg('Added Record');
      } else {
        dispatch({
          type: 'editRecord',
          payload: {
            date: recordDate.current,
            id: recordId.current,
            exp: {
              description,
              category,
              amount,
            },
          },
        });

        displayMsg('Edited Record');
      }

      setDescription('');
      setCategory('');
      setAmount('');
    } else {
      displayMsg('Number must be greater than Zero');
      setAmount('');
    }
  };

  const handleOnSelectCategory = (selectedItem, index) => {
    if (selectedItem !== 'Category') {
      setCategory(selectedItem);
    } else {
      setCategory('');
    }
  };

  const handleButtonTextAfterSelection = (selectedItem, index) => {
    return category ? selectedItem : 'Category';
  };

  const handleRowTextForSelection = (item, index) => item;

  const dropdownIcon = () => (
    <Icon
      name="caret-down-outline"
      type="ionicon"
      size={11}
      color={COLORS.secondary}
    />
  );

  const handleOnSubmit = () => {
    if (
      description.trim() &&
      category &&
      category !== 'Category' &&
      amount.trim()
    ) {
      addRecord();
    } else {
      Keyboard.dismiss();
    }
  };

  let headerText = isEditing ? 'Edit Record' : 'New Record';

  let amountInputStyle = [
    styles.inputField,
    {alignSelf: 'center', color: '#0beaaf', borderBottomColor: '#0beaaf'},
  ];

  let addButtonStyle = [
    styles.addBtn,
    {
      backgroundColor:
        description.trim() &&
        category &&
        category !== 'Category' &&
        amount.trim()
          ? '#3269ff'
          : '#2f3557',
    },
  ];

  useEffect(() => {
    onRender(showForm, hideForm);
  }, []);

  return (
    <Animated.View style={[styles.formWrapper, animatedStyle]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text allowFontScaling={false} style={styles.title}>
            {headerText}
          </Text>
          <Icon
            name="close-outline"
            type="ionicon"
            color="white"
            size={30}
            onPress={hideForm}
          />
        </View>

        {/* Description */}
        <TextInput
          placeholder="Description..."
          placeholderTextColor="white"
          value={description}
          maxLength={100}
          returnKeyType="go"
          style={styles.inputField}
          onChangeText={setDescription}
          onSubmitEditing={handleOnSubmit}
          selectTextOnFocus
        />

        {/* Category */}
        <SelectDropdown
          data={CATEGORIES}
          defaultValue={category}
          buttonStyle={styles.categoryContainer}
          buttonTextStyle={styles.category}
          dropdownStyle={styles.dropdownStyle}
          rowTextStyle={styles.dropdownRowTextStyle}
          rowStyle={styles.dropdownRowStyle}
          onSelect={handleOnSelectCategory}
          buttonTextAfterSelection={handleButtonTextAfterSelection}
          rowTextForSelection={handleRowTextForSelection}
          renderDropdownIcon={dropdownIcon}
        />

        {/* Amount */}
        <TextInput
          placeholder="Amount"
          placeholderTextColor="#0beaaf"
          value={amount}
          maxLength={17}
          returnKeyType="go"
          keyboardType="number-pad"
          style={amountInputStyle}
          onChangeText={addAmount}
          onSubmitEditing={handleOnSubmit}
          selectTextOnFocus
        />

        {/* Add Record */}
        <View style={addButtonStyle}>
          <Icon
            name="add-outline"
            type="ionicon"
            color="white"
            onPress={handleOnSubmit}
          />
        </View>
      </View>
    </Animated.View>
  );
};
