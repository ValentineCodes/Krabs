import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  Keyboard,
  TextInput,
  Alert,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import {COLORS} from '../constants/colors';

const SCREENWIDTH = Dimensions.get('screen').width;
const SCREENHEIGHT = Dimensions.get('screen').height;

const Categories = ({navigation}) => {
  const toast = useToast();
  const dispatch = useDispatch();

  const categories = useSelector((state) =>
    state.categories.filter((cat) => cat !== 'All' && cat !== 'Miscellaneous'),
  );

  const isFormVisible = useRef(false);

  const [category, setCategory] = useState('');

  const displayMsg = (msg, type) => {
    toast.show(msg, {
      type,
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

  const showForm = () => {
    offset.value = withTiming(0, {
      duration: 500,
    });
    opacity.value = withTiming(1, {
      duration: 700,
    });

    isFormVisible.current = true;
  };

  const hideForm = () => {
    offset.value = withTiming(SCREENHEIGHT, {
      duration: 500,
    });
    opacity.value = withTiming(0, {
      duration: 700,
    });

    Keyboard.dismiss();
    isFormVisible.current = false;
    setCategory('');
  };

  const addCategory = () => {
    let lowercaseCategories = categories.map((cat) => cat.toLowerCase());

    if (category.toLowerCase().trim() === 'all') {
      displayMsg('Not Allowed!. Anything but that', 'danger');
    } else if (lowercaseCategories.includes(category.toLowerCase().trim())) {
      displayMsg('Category Already Exist!', 'danger');
    } else {
      dispatch({
        type: 'addCategory',
        payload: category.trim(),
      });
      setCategory('');
      displayMsg('Category Successfully Added', 'success');
    }
  };

  const deleteCategory = (category) => {
    // Remove from list
    dispatch({
      type: 'removeCategory',
      payload: category,
    });

    // Remove from records
    dispatch({
      type: 'updateCategories',
      payload: category,
    });

    displayMsg(`${category} Category Deleted`, 'normal');
  };

  const handleOnDeleteCategory = (category) => {
    Alert.alert(
      'Delete this category?',
      "Fear Not! for Krabs will move all records it contains to the 'Miscellaneous' category.",
      [
        {
          text: 'NO',
          style: 'cancel',
        },

        {
          text: 'YES',
          style: 'destructive',
          onPress: () => {
            deleteCategory(category);
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };
  const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    if (isFormVisible.current) {
      hideForm();
    } else {
      navigation.pop();
    }

    return true;
  });

  let myCategories = categories.map((category, index) => (
    <TouchableOpacity
      key={index}
      activeOpacity={0.5}
      style={styles.categoryContainer}
      onLongPress={handleOnDeleteCategory.bind(this, category)}>
      <View style={styles.categoryHeader}>
        <Text allowFontScaling={false} style={styles.categoryTitle}>
          {category}
        </Text>
      </View>
    </TouchableOpacity>
  ));

  let addButtonStyle = [
    styles.addBtn,
    {
      backgroundColor: category.trim() ? '#3269ff' : '#2f3557',
    },
  ];

  useEffect(() => {
    return () => {
      backHandler.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Icon
            name="arrow-back"
            iconStyle={styles.headerIcon}
            onPress={() => navigation.pop()}
          />
          <Text allowFontScaling={false} style={styles.headerText}>
            Manage Categories
          </Text>
        </View>

        <Text allowFontScaling={false} style={styles.headerRight}>
          Long press to delete
        </Text>
      </View>

      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={styles.scrollviewContainer}>
        {myCategories}

        {/* Add Category */}
        <TouchableOpacity
          activeOpacity={0.5}
          style={[
            styles.categoryContainer,
            {backgroundColor: COLORS.secondary, paddingVertical: 10},
          ]}
          onPress={showForm}>
          <View style={styles.categoryHeader}>
            <Icon name="add" color="white" style={styles.categoryIcon} />
            <Text allowFontScaling={false} style={styles.categoryTitle}>
              Create
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Add Category Form */}
      <Animated.View style={[styles.formWrapper, animatedStyle]}>
        <View style={styles.formContainer}>
          <View style={styles.formHeader}>
            <Text allowFontScaling={false} style={styles.formTitle}>
              New Category
            </Text>
            <Icon
              name="close-outline"
              type="ionicon"
              color="white"
              size={30}
              onPress={hideForm}
            />
          </View>

          {/* Category Name */}
          <TextInput
            placeholder="What's this new category of yours?"
            placeholderTextColor={COLORS.faintWhite}
            value={category}
            maxLength={20}
            returnKeyType="go"
            style={styles.formInputField}
            onChangeText={setCategory}
            onSubmitEditing={category.trim() ? addCategory : null}
            selectTextOnFocus
          />

          {/* Add Record */}
          <View style={addButtonStyle}>
            <Icon
              name="add-outline"
              type="ionicon"
              color="white"
              onPress={category.trim() ? addCategory : null}
            />
          </View>
        </View>
      </Animated.View>
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
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {marginRight: 10, color: 'white'},
  headerText: {
    fontSize: SCREENWIDTH * 0.05,
    fontWeight: 'bold',
    color: COLORS.header,
  },
  headerRight: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: SCREENWIDTH * 0.04,
    color: COLORS.faintWhite,
  },

  scrollviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  categoryContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 5,
    borderWidth: 0.5,
    minWidth: '48%',
    borderColor: 'rgba(255,255,255,0.3)',
    paddingVertical: 15,
  },
  categoryHeader: {
    alignItems: 'center',
  },
  categoryIcon: {
    color: 'white',
  },
  categoryTitle: {
    fontWeight: 'bold',
    fontSize: SCREENWIDTH * 0.04,
    color: COLORS.header,
    marginVertical: 10,
  },

  // Form
  formWrapper: {
    position: 'absolute',
    top: 0,
    width: SCREENWIDTH,
    height: SCREENHEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  formContainer: {
    width: SCREENWIDTH,
    padding: 15,
    borderRadius: 20,
    borderWidth: 3,
    borderBottomWidth: 0,
    borderColor: '#2f3557',
    backgroundColor: COLORS.primary,
  },
  formHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formTitle: {
    fontSize: SCREENWIDTH * 0.05,
    fontWeight: 'bold',
    color: COLORS.header,
  },
  formInputField: {
    marginVertical: Platform.OS === 'ios' ? 15 : 10,
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.faintWhite,
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  addBtn: {
    alignSelf: 'center',
    padding: 10,
    marginTop: 10,
    borderRadius: 15,
  },
});

export default Categories;
