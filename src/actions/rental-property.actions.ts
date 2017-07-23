import { Injectable } from '@angular/core';

import { RentalProperty } from './../models/rental-property.model';

export const CREATE_RENTAL_PROPERTY = 'CREATE_RENTAL_PROPERTY';
export const UPDATE_RENTAL_PROPERTY = 'UPDATE_RENTAL_PROPERTY';
export const REMOVE_RENTAL_PROPERTY = 'REMOVE_RENTAL_PROPERTY';

@Injectable()
export class RentalPropertyActions {

    public remove(rentalProperty: RentalProperty) {
        return (dispatch: any) => {
            dispatch({
                type: REMOVE_RENTAL_PROPERTY,
                payload: rentalProperty
            });
        };
    }

    public create(rentalProperty: RentalProperty) {
        return (dispatch: any) => {
            dispatch({
                type: CREATE_RENTAL_PROPERTY,
                payload: rentalProperty
            });
        };
    }

    public update(rentalProperty: RentalProperty) {
        return (dispatch: any) => {
            dispatch({
                type: UPDATE_RENTAL_PROPERTY,
                payload: rentalProperty
            });
        };
    }
}