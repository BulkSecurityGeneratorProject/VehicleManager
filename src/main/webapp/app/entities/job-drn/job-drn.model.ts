import { BaseEntity } from './../../shared';

export class JobDrn implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public drivers?: number,
        public startDateTime?: any,
        public endDateTime?: any,
        public createdDateTime?: any,
        public modifiedDateTime?: any,
        public deleted?: boolean,
        public vehicleName?: string,
        public vehicleId?: number,
    ) {
        this.deleted = false;
    }
}
