import { CollisionResponse } from "./CollisionResponse";
import { InfluentialEntity } from "../entity/InfluentialEntity";
import { CollisionData } from "./collider/CollisionData";
import { Collider } from "./collider/Collider";
import { Context } from "../../resources/image/Context";

/**
 * Physical world
 * - Performs a physical operation
 * - Registers entities and apply a physical operation
 * @abstract
 * @classdesc Physical world to perform a physical operation by registering entities
 */
export abstract class PhysicalWorld {
    /**
     * Gravity power
     * @protected
     * @type {number}
     */
    protected gravity: number;

    /**
     * @return Gravity power.
     */
    getGravity(): number { return this.gravity; }

    /**
     * Collision response instance
     * @protected
     * @type {CollisionResponse}
     */
    protected response: CollisionResponse | null;

    /**
     * Physical world constructor
     * @constructor
     * @param {number} gravity Gravity of the world
     */
    constructor(gravity: number) {
        this.gravity = gravity * 100;
        this.response = null;
    }

    /**
     * Set response instance for collision response
     * @param {CollisionResponse} response Collision response instance
     */
    setResponse(response: CollisionResponse) {
        this.response = response;
    }

    /**
     * Get response instance for collision response
     * @return {CollisionResponse} Collision response instance
     */
    getResponse(): CollisionResponse | null {
        return this.response;
    }

    /**
     * Add entity in physical world
     * @abstract
     * @param {InfluentialEntity} entity Entity in physical world
     */
    abstract addEntity(entity: InfluentialEntity): void;

    /**
     * Remove entity from physical world
     * @abstract
     * @param {InfluentialEntity} entity Entity to remove from physical world
     */
    abstract removeEntity(entity: InfluentialEntity): void;

    /**
     * Get collision information now
     * @abstract
     * @param {Collider} collider Target collider
     * @return {Array<CollisionData>} Collision information now
     */
    abstract getCollisionData(collider: Collider): Array<CollisionData>;

    /**
     * Get the total number of collisions
     * @abstract
     * @return {number} Total number of collisions
     */
    abstract getCollisionSize(): number;

    /**
     * Update external force
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    abstract updateExternalForce(dt: number): void;

    /**
     * Prepare body
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    abstract prepareBody(dt: number): void;

    /**
     * Update body
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    abstract updateBody(dt: number): void;

    /**
     * Update body to cleanup
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    abstract updateBodyCleanup(dt: number): void;

    /**
     * Initialize collision state
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    abstract initCollision(dt: number): void;

    /**
     * Update collisions
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    abstract updateCollision(dt: number): void;

    /**
     * Update collisions response
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    abstract updateResponse(dt: number): void;

    /**
     * Judge whether collision detection continue or not
     * @abstract
     * @protected
     * @param {number} dt Delta time
     * @return {boolean} Whether collision detection continue or not
     */
    abstract judgeContinueCollision(dt: number): boolean;

    /**
     * Cleanup all information
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    abstract cleanup(dt: number): void;

    /**
     * Update physical world
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    update(dt: number) {
        this.updateExternalForce(dt);
        this.prepareBody(dt);
        this.updateBody(dt);
        this.updateBodyCleanup(dt);
        this.initCollision(dt);
        do {
            this.updateCollision(dt);
            this.updateResponse(dt);
        } while (this.judgeContinueCollision(dt));
        this.cleanup(dt);
    }

    /**
     * Render world
     * @abstract
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    abstract render(ctx: Context, shiftX: number, shiftY: number): void;
}
