import { createActions } from 'redux-actions';

// Here you can create any actions needed

export const {
  exampleActionOne,
  exampleActionTwo,
  exampleActionThree,
  // ...
} = createActions({
  EXAMPLE_ACTION_ONE: (anything) => anything,
  EXAMPLE_ACTION_TWO: (orNothing) => null,
  EXAMPLE_ACTION_THREE: () => null,
  // ...
});
