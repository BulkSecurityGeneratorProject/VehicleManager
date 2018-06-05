import { BaseEntity } from './../../shared';

export class JobWorkerDrn implements BaseEntity {
    constructor(
        public id?: number,
        public createdDateTime?: any,
        public modifiedDateTime?: any,
        public deleted?: boolean,
        public workName?: string,
        public workId?: number,
        public driverId?: number,
    ) {
        this.deleted = false;
    }
}
