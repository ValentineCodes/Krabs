import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {Icon} from 'react-native-elements';

import {styles} from './styles';

import Header from './Header/index';
import Record from './Record/index';
import {COLORS} from '../../constants/colors';

export default function ({onPressAdd, navigation}) {
  const records = useSelector((state) => Object.entries(state.records));

  const [selectedCategory, setSelectedCategory] = useState('All');
  const getExpenses = (expenses) => {
    if (selectedCategory === 'All') {
      return expenses;
    } else {
      return expenses.filter((data) => data.category === selectedCategory);
    }
  };

  const renderItem = ({item}) => {
    let date = item[0];
    let expenses = item[1];

    return (
      <Record
        date={date}
        expenses={getExpenses(expenses)}
        onPressEdit={onPressAdd}
      />
    );
  };

  const recordKeyExtractor = (record) => record[0];

  return (
    <View style={styles.container}>
      <Header
        onSelectCategory={setSelectedCategory}
        onPressAdd={onPressAdd}
        navigation={navigation}
      />

      {records.length !== 0 ? (
        <FlatList
          data={records.reverse()}
          keyExtractor={recordKeyExtractor}
          renderItem={renderItem}
        />
      ) : (
        <View style={styles.noRecords}>
          <Icon
            name="create-outline"
            type="ionicon"
            size={70}
            color={COLORS.faintWhite}
          />
        </View>
      )}
    </View>
  );
}
