import { Injectable } from '@angular/core';
import { Database } from './database';
import { RentalProperty } from '../../models/rental-property.model';
import { SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class RentalPropertyStorage {

    isOpen: boolean;

    constructor(private database: Database) {
    }

    create(item: RentalProperty) {
        let insertQuery = "INSERT INTO rentalproperty (building_name) VALUES (?)";
        return this.database.openConnection().then((db: SQLiteObject) => {
            console.log('sql:', insertQuery);
            return db.executeSql(insertQuery, ["item.buildingName"]).then(res => {
                return Promise.resolve(res);
            }).catch(e => {
                return Promise.resolve(e);
            });
        }).catch(e => {
            return Promise.resolve(e);
        });
    }

     update(item: RentalProperty) {
        let insertQuery = "INSERT INTO rentalproperty (building_name) VALUES (?)";
        return this.database.openConnection().then((db: SQLiteObject) => {
            return db.executeSql(insertQuery, [item.buildingName]).then(res => {
                return Promise.resolve(res);
            }).catch(e => {
                return Promise.resolve(e);
            });
        }).catch(e => {
            return Promise.resolve(e);
        });
    }

    remove(item: string) {
        let insertQuery = "INSERT INTO rentalproperty (building_name) VALUES (?)";
        return this.database.openConnection().then((db: SQLiteObject) => {
            return db.executeSql(insertQuery, [item]).then(res => {
                return Promise.resolve(res);
            }).catch(e => {
                return Promise.resolve(e);
            });
        }).catch(e => {
            return Promise.resolve(e);
        });
    }

    get(id: string) : RentalProperty {
        return new RentalProperty();
    }

    getAll() : Array<RentalProperty> {
        return [];
    }
}