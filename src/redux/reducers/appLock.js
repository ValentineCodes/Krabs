let init = {
  enabled: false,
  password: 'MR.KRABS',
  method: 'password', // || fingerprint
  isDefault: true,
};

export default function appLockReducer(state = init, action) {
  if (action.type === 'updateAppLockEnabled') {
    return {...state, enabled: action.payload};
  } else if (action.type === 'updateAppLockPassword') {
    return {...state, password: action.payload};
  } else if (action.type === 'updateAppLockMethod') {
    return {...state, method: action.payload};
  } else if (action.type === 'updateAppLockIsDefault') {
    return {...state, isDefault: action.payload};
  } else {
    return state;
  }
}
