import {
  exampleActionOne,
  exampleActionThree,
  exampleActionTwo,
} from './actions';

import { ExampleReducerState } from './interfaces';
import { handleActions } from 'redux-actions';
import persistReducer from 'redux-persist/lib/persistReducer';
import storage from '../storage';

// If you to use LocalStorage ^
// If you to use IndexedDB    v

// import storage from 'redux-persist-indexeddb-storage';

const initialState: ExampleReducerState = {
  name: '',
  address: '',
  phone: 0,
};

const persistConfig = {
  key: 'example',
  // If you to use LocalStorage ->
  storage,
  // If you to use IndexedDB    ->
  // storage: storage('example'),
};

const ExampleReducer = persistReducer<ExampleReducerState>(
  persistConfig,
  handleActions(
    {
      [exampleActionOne]: (state: ExampleReducerState) => {
        return {
          ...state,
          name: 'John Snow',
        };
      },
      [exampleActionTwo]: (state: ExampleReducerState) => {
        return {
          ...state,
          address: 'Westeros',
        };
      },
      [exampleActionThree]: (state: ExampleReducerState) => {
        return {
          ...state,
          phone: 999999999,
        };
      },
    },
    initialState
  )
);

export default ExampleReducer;
