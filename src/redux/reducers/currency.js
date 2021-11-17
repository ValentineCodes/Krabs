export default function currencyReducer(state = '\u20A6', action) {
  if (action.type == 'updateCurrency') {
    return action.payload;
  } else {
    return state;
  }
}
