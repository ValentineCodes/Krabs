import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Reducers
import records from './reducers/records';
import dailyBudget from './reducers/dailyBudget';
import init from './reducers/init';
import currency from './reducers/currency';
import appLock from './reducers/appLock';
import categories from './reducers/categories';

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
  categories: categories,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(thunk));
  let persistor = persistStore(store);
  return {store, persistor};
};
