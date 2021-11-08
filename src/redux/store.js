import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Reducers
import records from '../redux/reducers/records';
import dailyBudget from '../redux/reducers/dailyBudget';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const reducers = combineReducers({records: records, dailyBudget: dailyBudget});

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(thunk));
  let persistor = persistStore(store);
  return {store, persistor};
};
