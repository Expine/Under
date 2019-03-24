import { CollisionData } from "./collider/CollisionData";

/**
 * Collision response
 * - Performs collision response
 * @abstract
 * @classdesc Collision response to performs collision response
 */
export abstract class CollisionResponse {
    /**
     * Perform collision response
     * @abstract
     * @param {CollisionData} data Collision data
     * @param {number} dt delta time
     */
    abstract collisionResponse(data: CollisionData, dt: number): void;
}
