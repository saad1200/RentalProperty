import { combineReducers } from 'redux';
import rentalPropertyReducer from './rental-property-reducer';

const rootReducer = combineReducers({
  rentalPropertyState: rentalPropertyReducer
});

export default rootReducer;