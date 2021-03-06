import React from 'react';
import {View, Text} from 'react-native';

import {Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';
import SelectDropdown from 'react-native-select-dropdown';

import {styles} from './styles';

import {COLORS} from '../../../constants/colors';

export default function ({onSelectCategory, onPressAdd, navigation}) {
  const categories = useSelector((state) => state.categories);

  const handleOnSelectCategory = (selectedItem, index) => {
    onSelectCategory(selectedItem);
  };

  const buttonTextAfterSelection = (selectedItem, index) => selectedItem;

  const rowTextForSelection = (item, index) => item;

  const dropdownicon = () => (
    <Icon
      name="caret-down-outline"
      type="ionicon"
      size={11}
      color={COLORS.secondary}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>

      <View style={styles.headerRight}>
        <SelectDropdown
          data={['All', ...categories]}
          defaultValue="All"
          buttonStyle={styles.dropdown}
          buttonTextStyle={styles.dropdownText}
          dropdownStyle={styles.dropdownStyle}
          rowTextStyle={styles.dropdownRowTextStyle}
          rowStyle={styles.dropdownRowStyle}
          onSelect={handleOnSelectCategory}
          buttonTextAfterSelection={buttonTextAfterSelection}
          rowTextForSelection={rowTextForSelection}
          renderDropdownIcon={dropdownicon}
        />

        <View style={styles.btn}>
          <Icon
            name="add-outline"
            type="ionicon"
            color="#fff"
            onPress={() => onPressAdd()}
          />
        </View>
        <View style={styles.btn}>
          <Icon
            name="cog-outline"
            type="ionicon"
            color="#fff"
            onPress={() => navigation.navigate('Settings')}
          />
        </View>
      </View>
    </View>
  );
}
