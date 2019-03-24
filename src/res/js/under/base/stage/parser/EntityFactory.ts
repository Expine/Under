import { Entity } from "../entity/Entity";

/**
 * Type of entity ID
 */
export type EntityID = number | string;

/**
 * Entity factory
 * - Generates entity by ID
 * @abstract
 * @classdesc Entity factory to generate entity by ID
 */
export abstract class EntityFactory {
    /**
     * Create entity from factory data
     * @abstract
     * @param {EntityID} id ID for entity
     * @param {any} deploy Entity deploy json data
     * @return {Entity} Entity instance
     */
    abstract createEntity(id: EntityID, deploy: any): Entity | null;
}
