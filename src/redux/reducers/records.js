import uuid from 'react-native-uuid';

export default function recordsReducer(state = {}, action) {
  if (action.type === 'addRecord') {
    let newState = Object.assign({}, state);

    if (newState[action.payload.date] !== undefined) {
      newState[action.payload.date] = [
        {id: uuid.v4(), ...action.payload.exp},
        ...newState[action.payload.date],
      ];
    } else {
      newState[action.payload.date] = [{id: uuid.v4(), ...action.payload.exp}];
    }

    return newState;
  } else if (action.type === 'editRecord') {
    let newState = Object.assign({}, state);

    newState[action.payload.date] = newState[action.payload.date].map(
      (record) =>
        record.id !== action.payload.id
          ? record
          : {id: record.id, ...action.payload.exp, time: record.time},
    );

    return newState;
  } else if (action.type === 'deleteRecord') {
    let newState = Object.assign({}, state);

    if (newState[action.payload.date].length === 1) {
      delete newState[action.payload.date];
    } else {
      newState[action.payload.date] = newState[action.payload.date].filter(
        (record) => record.id !== action.payload.id,
      );
    }

    return newState;
  } else {
    return state;
  }
}
