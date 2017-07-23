import { Injectable } from '@angular/core';

import { RentalProperty } from './../models/rental-property.model';
import { RentalPropertyStorage } from '../providers';

@Injectable()
export class RentalPropertyService {

    constructor(private rentalPropertyStorage: RentalPropertyStorage){}

    public async create(rentalProperty: RentalProperty) { 
        await this.rentalPropertyStorage.create(rentalProperty);
    }

    public async update(rentalProperty: RentalProperty) { 
        await this.rentalPropertyStorage.update(rentalProperty);
    }

    public async remove(id: string) { 
        await this.rentalPropertyStorage.remove(id);
    }

    public async get(id: string) {
        let item = await this.rentalPropertyStorage.get(id);
        return item;
    }

    public async getAll() {
        let items: Array<RentalProperty> = await this.rentalPropertyStorage.getAll();
        return items;
    }
}
