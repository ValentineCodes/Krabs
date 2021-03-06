import React, {useMemo} from 'react';
import {View, Text, Alert} from 'react-native';
import {Icon} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';

import {getTimestamp} from '../../../constants/helperFns';

import {styles} from './styles';

const Record = ({
  id,
  date,
  time,
  description,
  category,
  amount,
  onPressEdit,
}) => {
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.currency);

  const editRecord = () =>
    onPressEdit(date, id, description, category, amount, 'editRecord');

  const deleteRecord = () => {
    Alert.alert(
      'Delete this record?',
      'This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },

        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch({
              type: 'deleteRecord',
              payload: {id, date},
            });
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const renderRecord = useMemo(
    () => (
      <View key={id} style={styles.dataContainer}>
        <Text allowFontScaling={false} style={styles.time}>
          {time}
        </Text>

        <View style={styles.data}>
          <Text allowFontScaling={false} style={styles.description}>
            {description}
          </Text>
          <Text allowFontScaling={false} style={styles.category}>
            {category}
          </Text>
          <Text allowFontScaling={false} style={styles.amount}>
            {currency}
            {amount}
          </Text>

          <View style={styles.dataModifierIcons}>
            <View style={{marginRight: 20}}>
              <Icon
                name="create-outline"
                type="ionicon"
                size={20}
                color="#0beaaf"
                onPress={editRecord}
              />
            </View>
            <Icon
              name="trash-outline"
              type="ionicon"
              size={20}
              color="red"
              onPress={deleteRecord}
            />
          </View>
        </View>
      </View>
    ),
    [id, date, time, description, category, amount, currency, onPressEdit],
  );

  return <>{renderRecord}</>;
};

// Main Component
export default function ({date, expenses, onPressEdit}) {
  const renderRecord = (record) => (
    <Record
      key={record.id}
      id={record.id}
      date={date}
      time={record.time}
      description={record.description}
      category={record.category}
      amount={record.amount}
      onPressEdit={onPressEdit}
    />
  );

  return (
    <View style={styles.container}>
      {/* Date */}
      <Text style={styles.date}>
        {getTimestamp().date === date ? 'Today' : date}
      </Text>

      {/* Expenses */}
      {expenses.length == 0 ? (
        <Text style={styles.msg}>No record for this category</Text>
      ) : (
        // renderRecord()
        expenses.map(renderRecord)
      )}
    </View>
  );
}
