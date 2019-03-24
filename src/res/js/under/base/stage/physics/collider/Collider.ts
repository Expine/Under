import { AABB } from "./AABB";
import { CollisionData } from "./CollisionData";
import { Entity } from "../../entity/Entity";
import { Context } from "../../../resources/image/Context";

/**
 * Collder
 * - Store collider data for judgeing collision
 * @abstract
 * @classdesc Collider to store collider data for judging collision
 */
export abstract class Collider {
    /**
     * AABB for collision detection
     * @protected
     * @type {AABB}
     */
    aabb: AABB | null;

    /**
     * List of collided objects
     * @type {Array<CollisionData>}
     */
    collisions: Array<CollisionData>

    /**
     * Whether to perform collision response or not
     * @type {boolean}
     */
    response: boolean;
    /**
     * Whether collision judgment is to be done or not
     * @type {boolean}
     */
    enable: boolean;

    /**
     * Entity attaching this
     * @protected
     * @type {Entity}
     */
    entity: Entity | null;

    /**
     * Whether or not the collision information has already been cleared
     * @protected
     * @type {boolean}
     */
    protected cleared: boolean;


    /**
     * Collider constructor
     * @constructor
     */
    constructor() {
        this.aabb = null;
        this.collisions = [];

        this.response = true;
        this.enable = true;

        this.entity = null;
        this.cleared = false;
    }

    /**
     * Initialize state
     */
    init() {
        if (!this.cleared) {
            this.clear();
        }
        this.update();
        this.cleared = false;
    }

    /**
     * Clear collision data
     */
    clear() {
        this.collisions.length = 0;
        this.cleared = true;
    }

    /**
     * Set entity attaching this
     * @param {Entity} entity Entity attaching this
     */
    setEntity(entity: Entity) {
        this.entity = entity;
    }

    /**
     * Set collider AABB
     * @param {AABB} aabb Axis Aligned Bounding Box
     */
    setAABB(aabb: AABB) {
        this.aabb = aabb;
    }

    /**
     * Get collider AABB
     * @return {AABB} Axis Aligned Bounding Box
     */
    getAABB(): AABB | null {
        return this.aabb;
    }

    /**
     * Add collision information
     * @param {CollisionData} collision Collision information to be added
     */
    addCollision(collision: CollisionData) {
        this.collisions.push(collision);
    }

    /**
     * Set whether to perform collision response or not
     * @param {Collider} collider Target collider
     * @return {boolean} whether to perform collision response or not
     */
    isResponse(_collider: Collider): boolean {
        return this.response;
    }

    /**
     * Judge whether position is in collider
     * @abstract
     * @param {number} x X position
     * @param {number} y Y position
     * @return {boolean} Whether position is in collider
     */
    abstract isInCollider(x: number, y: number): boolean;

    /**
     * Judge whether collision
     * @abstract
     * @param {Collider} collider Target collider
     * @param {CollisionData} data Pointer to save conflict information
     * @return {boolean} Whether collision
     */
    abstract isCollision(collider: Collider, data: CollisionData | null): boolean;

    /**
     * Judge whether collision roughly
     * @param {Collider} collider Target collider
     * @return {boolean} Qhether collision roughly
     */
    isCollisionRoughly(collider: Collider): boolean {
        // check enable
        if (!this.enable) {
            return false;
        }
        const me = this.getAABB();
        const you = collider.getAABB();
        if (me === null || you === null) {
            return false;
        }
        return me.endX >= you.startX && you.endX >= me.startX && me.endY >= you.startY && you.endY >= me.startY;
    }

    /**
     * Fix collider bounds
     * @abstract
     * @param {number} startX Relative x coordinate of the upper left
     * @param {number} startY Relative y coordinate of the upper left
     * @param {number} endX Relative x coordinate of the lower right
     * @param {number} endY Relative y coordinate of the lower right
     */
    abstract fixBound(startX: number, startY: number, endX: number, endY: number): void;

    /**
     * Update collide information
     * Called whenever coordinate information is updated
     * @abstract
     */
    abstract update(): void;

    /**
     * Render collider for debug
     * @abstract
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    abstract render(ctx: Context, shiftX: number, shiftY: number): void;
}
