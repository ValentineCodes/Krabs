import React, {useState, useEffect, useRef} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Svg, Rect, Text as TextSvg} from 'react-native-svg';
import SelectDropdown from 'react-native-select-dropdown';
import {useSelector} from 'react-redux';
import {Icon} from 'react-native-elements';

import {styles} from './styles';

import {COLORS} from '../../constants/colors';

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const DROPDOWN_ITEMS = [
  'Last 7 days',
  'Last 30 days',
  'Last 60 days',
  'This year',
];

export default function () {
  const records = useSelector((state) => state.records);
  const currency = useSelector((state) => state.currency);
  const categories = useSelector((state) => state.categories);
  const labelLength = useRef(7);
  const category = useRef('All');

  const [dates, setDates] = useState([]);
  const [amounts, setAmounts] = useState([0]);
  const [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
    value: 0,
    visible: false,
  });

  const getRecords = () => {
    if (labelLength.current !== 12) {
      let dates = [];
      let amounts = [];

      // Get all required dates
      for (let x = 0; x < labelLength.current; x++) {
        let date = new Date();
        date.setDate(date.getDate() - x);

        let monthIndex = date.getMonth();
        let day = date.getDate();
        let year = date.getFullYear();

        dates.push(`${MONTHS[monthIndex]} ${day}, ${year}`);
      }

      // Check if any records exist
      if (Object.keys(records).length !== 0) {
        // Get amounts
        for (let date of dates) {
          /// Check if records exist for the date
          if (records[date] !== undefined) {
            let totalAmount = records[date]
              .map((record) =>
                category.current === 'All' ||
                category.current === record.category
                  ? record.amount
                  : 0,
              )
              .reduce((total, amount) => parseInt(total) + parseInt(amount));

            amounts.push(totalAmount);
          } else {
            amounts.push(0);
          }
        }

        setAmounts(amounts);
      } else {
        setAmounts([0]);
      }

      setDates(dates);
    } else if (Object.keys(records).length !== 0) {
      // Get chart data for "This year"

      let _records = Object.entries(records);
      let date = new Date();
      let year = `${date.getFullYear()}`;

      let amounts = [];

      let currentIndex = _records.length - 1;

      for (monthIndex = MONTHS.length - 1; monthIndex > -1; monthIndex--) {
        let total = 0;

        for (i = currentIndex; i >= -1; i--) {
          // Check if the property is the valid month and year
          if (i === -1) {
            amounts.push(total);
            break;
          }

          if (
            _records[i][0].includes(MONTHS[monthIndex]) &&
            _records[i][0].includes(year)
          ) {
            let sum = _records[i][1]
              .map((record) =>
                category.current === 'All' ||
                category.current === record.category
                  ? record.amount
                  : 0,
              )
              .reduce((total, amount) => parseInt(total) + parseInt(amount));

            total = total + parseInt(sum);
          } else {
            amounts.push(total);
            currentIndex = i;
            break;
          }
        }
      }

      setAmounts(amounts.reverse());
      setDates(MONTHS);
    } else {
      setAmounts([0]);
      setDates[MONTHS];
    }
  };

  const calcChartWidth = () => {
    if (labelLength.current === 7) {
      return 600;
    } else if (labelLength.current === 30) {
      return 2500;
    } else if (labelLength.current === 60) {
      return 5000;
    } else {
      return 800;
    }
  };

  const getTotalAmount = () => {
    let totalAmount = amounts.reduce(
      (total, amount) => parseInt(total) + parseInt(amount),
    );
    return totalAmount;
  };

  // Dropdown Props
  const handleOnSelectPeriod = (selectedItem, index) => {
    let num;
    if (selectedItem === 'Last 7 days') {
      num = 7;
    } else if (selectedItem === 'Last 30 days') {
      num = 30;
    } else if (selectedItem === 'Last 60 days') {
      num = 60;
    } else {
      num = 12;
    }

    labelLength.current = num;
    getRecords();
  };

  const handleOnSelectCategory = (selectedItem, index) => {
    category.current = selectedItem;
    getRecords();
  };

  const buttonTextAfterSelection = (selectedItem, index) => selectedItem;
  const rowTextForSelection = (item, index) => item;

  const dropdownIcon = () => (
    <Icon
      name="caret-down-outline"
      type="ionicon"
      size={11}
      color={COLORS.secondary}
    />
  );

  // Chart Props

  const chartData = {
    labels: dates,
    datasets: [
      {
        data: amounts,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: COLORS.tertiary,
    backgroundGradientTo: COLORS.tertiary,
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  };

  const renderTooltip = () => {
    return tooltipPos.visible ? (
      <Svg>
        <Rect
          x={tooltipPos.x - 25}
          y={tooltipPos.y + 10}
          width="50"
          height="30"
          fill={COLORS.primary}
        />
        <TextSvg
          x={tooltipPos.x}
          y={tooltipPos.y + 30}
          fill={COLORS.amount}
          fontSize="10"
          fontWeight="bold"
          textAnchor="middle">
          {tooltipPos.value}
        </TextSvg>
      </Svg>
    ) : null;
  };

  const handleOnDataPointClick = (data) => {
    let isSamePoint = tooltipPos.x === data.x && tooltipPos.y === data.y;

    isSamePoint
      ? setTooltipPos((previousState) => {
          return {
            ...previousState,
            value: data.value,
            visible: !previousState.visible,
          };
        })
      : setTooltipPos({
          x: data.x,
          y: data.y,
          value: data.value,
          visible: true,
        });
  };

  useEffect(() => {
    getRecords();
  }, [records]);
  return (
    <View>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          {/* Range dropdown */}
          <SelectDropdown
            data={DROPDOWN_ITEMS}
            defaultValue="Last 7 days"
            buttonStyle={styles.dropdown}
            buttonTextStyle={styles.dropdownText}
            dropdownStyle={styles.dropdownStyle}
            rowTextStyle={styles.dropdownRowTextStyle}
            rowStyle={styles.dropdownRowStyle}
            onSelect={handleOnSelectPeriod}
            buttonTextAfterSelection={buttonTextAfterSelection}
            rowTextForSelection={rowTextForSelection}
            renderDropdownIcon={dropdownIcon}
          />

          {/* Category dropdown */}
          {Object.keys(records).length === 0 ? (
            <Text style={{...styles.dropdownText, marginLeft: 32}}>
              No records
            </Text>
          ) : (
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
              renderDropdownIcon={dropdownIcon}
            />
          )}
        </View>

        <View style={styles.amountContainer}>
          <Text style={styles.amount}>
            {currency}
            {getTotalAmount()}
          </Text>
          <Text style={[styles.amount, styles.avgAmt]}>
            a.v.g {'\u21D2'} {currency}
            {(getTotalAmount() / labelLength.current).toFixed(2)}{' '}
            {labelLength.current === 12 ? 'PM' : 'PD'}
          </Text>
        </View>
      </View>

      {/* Chart */}
      <ScrollView style={styles.chart} horizontal>
        <LineChart
          bezier
          data={chartData}
          width={calcChartWidth()}
          height={220}
          withDots={true}
          withShadow={false}
          withInnerLines={false}
          withOuterLine={false}
          chartConfig={chartConfig}
          style={styles.chartStyle}
          decorator={renderTooltip}
          onDataPointClick={handleOnDataPointClick}
        />
      </ScrollView>
    </View>
  );
}
