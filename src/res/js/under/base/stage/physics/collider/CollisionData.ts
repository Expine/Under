import { MutableEntity } from "../../entity/MutableEntity";
import { InfluentialEntity } from "../../entity/InfluentialEntity";

/**
 * Collision data
 * - Data obtained by collision detection
 * @abstract
 * @classdesc Collision data obtained by collision detection
 */
export abstract class CollisionData {
    /**
     * Colliding entity
     * @type {MutableEntity}
     */
    colliding: MutableEntity;
    /**
     * Collided entity
     * @type {InfluentialEntity}
     */
    collided: InfluentialEntity;
    /**
     * X component of normalized collision vector from colliding to collided
     * @type {number}
     */
    nx: number;
    /**
     * Y component of normalized collision vector from colliding to collided
     * @type {number}
     */
    ny: number;
    /**
     * Depth of collision
     * @type {number}
     */
    depth: number;
    /**
     * Collision x point
     * @type {number}
     */
    px: number;
    /**
     * Collision y point
     * @type {number}
     */
    py: number;

    /**
     * Descending priority
     * @protected
     * @type {number}
     */
    priorityVal: number | null;


    /**
     * Collision data constructor
     * @constructor
     * @param {MutableEntity} colliding Colliding entity
     * @param {InfluentialEntity} collided Collided entity
     * @param {number} nx X component of normal vector
     * @param {number} ny Y component of normal vector
     * @param {number} px Collision x point
     * @param {number} py Collision y point
     * @param {number} depth Depth of collision
     */
    constructor(colliding: MutableEntity, collided: InfluentialEntity, nx: number, ny: number, px: number, py: number, depth: number) {
        this.colliding = colliding;
        this.collided = collided;
        this.nx = nx;
        this.ny = ny;
        this.depth = depth;
        this.px = px;
        this.py = py;

        this.priorityVal = 0;
    }

    get priority() {
        if (this.priorityVal === null) {
            this.priorityVal = this.calcPriority();
        }
        return this.priorityVal;
    }

    /**
     * Register information
     * @param {MutableEntity} colliding Colliding entity
     * @param {InfluentialEntity} collided Collided entity
     * @param {number} nx X component of normal vector
     * @param {number} ny Y component of normal vector
     * @param {number} px Collision x point
     * @param {number} py Collision y point
     * @param {number} depth Depth of collision
     */
    register(colliding: MutableEntity, collided: InfluentialEntity, nx: number, ny: number, px: number, py: number, depth: number) {
        this.colliding = colliding;
        this.collided = collided;
        this.nx = nx;
        this.ny = ny;
        this.px = px;
        this.py = py;
        this.depth = depth;
    }

    /**
     * Initialize collision data
     */
    init() {
        this.priorityVal = null;
    }

    /**
     * Calculate descending priority
     * @abstract
     * @protected
     * @return {number} Priority
     */
    protected abstract calcPriority(): number;
}
