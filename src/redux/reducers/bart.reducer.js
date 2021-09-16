import { combineReducers } from 'redux';

const messageReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return [...state, { [action.payload.from]: action.payload.message }];
    default:
      return state;
  }
};

export default combineReducers({
  messageReducer,
});
