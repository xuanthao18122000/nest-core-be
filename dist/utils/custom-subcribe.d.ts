import { EntitySubscriberInterface, InsertEvent, RemoveEvent, UpdateEvent } from 'typeorm';
export declare class mySubscriber implements EntitySubscriberInterface {
    beforeInsert(event: InsertEvent<any>): Promise<void>;
    beforeUpdate(event: UpdateEvent<any>): Promise<void>;
    beforeRemove(event: RemoveEvent<any>): void;
}
