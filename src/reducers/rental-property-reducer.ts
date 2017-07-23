import { CREATE_RENTAL_PROPERTY, UPDATE_RENTAL_PROPERTY, REMOVE_RENTAL_PROPERTY } from '../actions/rental-property.actions';
import { RentalPropertyState } from './../models/rental-property-state.model';

const initialState: RentalPropertyState = {
  items: []
}

export default function rentalPropertyReducer(state: RentalPropertyState = initialState, action) {
  switch (action.type) {
  case CREATE_RENTAL_PROPERTY:
    return {
      ...state,
      items: [...state.items, action.payload]
    };
  case UPDATE_RENTAL_PROPERTY:
    return {
      ...state,
      items: state.items.map( x => x.id === action.payload.id ? action.payload : x)
    };
  case REMOVE_RENTAL_PROPERTY:
    return {
      ...state,
      items: state.items.filter( x => x.id !== action.payload.id)
    };
  default:
    return state;
  }
}