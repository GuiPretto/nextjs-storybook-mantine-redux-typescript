import ExampleReducer from './Example/reducer';
import { ExampleReducerState } from './Example/interfaces';
import { combineReducers } from 'redux';

interface RootReducer {
  Example: ExampleReducerState;
}

const rootReducer = combineReducers<RootReducer>({
  Example: ExampleReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
