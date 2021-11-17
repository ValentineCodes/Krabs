import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Reducers
import records from '../redux/reducers/records';
import dailyBudget from '../redux/reducers/dailyBudget';
import init from '../redux/reducers/init';
import currency from '../redux/reducers/currency';
import appLock from '../redux/reducers/appLock';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const reducers = combineReducers({
  records: records,
  dailyBudget: dailyBudget,
  init: init,
  currency: currency,
  appLock: appLock,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(thunk));
  let persistor = persistStore(store);
  return {store, persistor};
};
