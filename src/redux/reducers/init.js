export default function initReducer(state = true, action) {
  if (action.type == 'updateInit') {
    return action.payload;
  } else {
    return state;
  }
}
