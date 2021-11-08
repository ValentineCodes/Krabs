export default function recordsReducer(state = 0, action) {
  if (action.type == 'addBudget') {
    return action.payload;
  } else {
    return state;
  }
}
