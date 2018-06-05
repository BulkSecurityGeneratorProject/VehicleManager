import { BaseEntity } from './../../shared';

export class CostDrn implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public perDay?: number,
        public perKm?: number,
        public createdDateTime?: any,
        public modifiedDateTime?: any,
        public deleted?: boolean,
        public vehicleId?: number,
    ) {
        this.deleted = false;
    }
}
