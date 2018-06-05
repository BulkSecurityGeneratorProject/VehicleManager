import { BaseEntity } from './../../shared';

export class VehicleDrn implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public numberPlate?: string,
        public numberOfPlace?: number,
        public createdDateTime?: any,
        public modifiedDateTime?: any,
        public deleted?: boolean,
    ) {
        this.deleted = false;
    }
}
