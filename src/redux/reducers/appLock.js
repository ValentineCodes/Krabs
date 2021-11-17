let init = {
  enabled: false,
  password: 'Mr.Krabs',
  method: 'password', // || fingerprint
};

export default function appLockReducer(state = init, action) {
  if (action.type === 'updateAppLockEnabled') {
    return {...state, enabled: action.payload};
  } else if (action.type === 'updateAppLockPassword') {
    return {...state, password: action.payload};
  } else if (action.type === 'updateAppLockMethod') {
    return {...state, method: action.payload};
  } else {
    return state;
  }
}
