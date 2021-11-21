const categories = [
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

export default function categoriesReducer(state = categories, action) {
  if (action.type === 'addCategory') {
    return [action.payload, ...state];
  } else if (action.type === 'removeCategory') {
    return state.filter((category) => category !== action.payload);
  } else {
    return state;
  }
}
