import { Entity } from "../Entity";

/**
 * Owned interface
 * - Owned by someone
 * @interface
 * @classdesc Owned interface owned by someone
 */
export interface IOwned {
    /**
     * Set owned entity
     * @abstract
     * @param {Entity} owner Owned entity
     */
    setOwner(owner: Entity): void;

    /**
     * Get owned entity
     * @abstract
     * @return {Entity} Owned entity
     */
    getOwner(): Entity | null;
}

/**
 * Type guard for IOwned
 */
export const isIOwned = (arg: any): arg is IOwned => arg !== null && arg.getOwner !== undefined;
