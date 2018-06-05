import { BaseEntity } from './../../shared';

export class DriverDrn implements BaseEntity {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public businessIdentification?: string,
        public phoneNumber?: string,
        public hireDate?: any,
        public createdDateTime?: any,
        public modifiedDateTime?: any,
        public deleted?: boolean,
        public jobs?: BaseEntity[],
    ) {
        this.deleted = false;
    }
}
