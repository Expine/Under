import { Collider } from "../../physics/collider/Collider";

/**
 * Colliderable interface
 * - Object that has collide
 * @interface
 * @classdesc Colliderable interface that has collider
 */
export interface IColliderable {
    /**
     * Get collider
     * @abstract
     * @return {Collider} Collider that object has
     */
    getCollider(): Collider | null;
}

/**
 * Type guard for IColliderable
 */
export const isIColliderable = (arg: any): arg is IColliderable =>
    arg !== null && arg.getCollider !== undefined;
