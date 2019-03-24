import { AABB } from "../../../../base/stage/physics/collider/AABB";
import { Entity } from "../../../../base/stage/entity/Entity";

/**
 * Axis Aligned Bounding Box
 * - Decides from 4 vertices
 * @extends {AABB}
 * @classdesc Simple Axis Aligned Bounding Box to decide from 4 vertices
 */
export class SimpleAABB extends AABB {
    /**
     * X coordinate of the upper left
     * @type {number}
     */
    protected startXVal: number;
    /**
     * Y coordinate of the upper left
     * @type {number}
     */
    protected startYVal: number;
    /**
     * X coordinate of the lower right
     * @type {number}
     */
    protected endXVal: number;
    /**
     * Y coordinate of the lower right
     * @type {number}
     */
    protected endYVal: number;

    /**
     * AABB Constructor
     * @constructor
     * @param {number} [startX = 0] X coordinate of the upper left
     * @param {number} [startY = 0] Y coordinate of the upper left
     * @param {number} [endX = 0] X coordinate of the lower right
     * @param {number} [endY = 0] Y coordinate of the lower right
     */
    constructor(startX: number = 0, startY: number = 0, endX: number = 0, endY: number = 0) {
        super();

        this.startXVal = startX;
        this.startYVal = startY;
        this.endXVal = endX;
        this.endYVal = endY;
    }

    /**
     * Get start x position
     * @override
     * @return {number} Start x position
     */
    get startX(): number {
        return this.startXVal;
    }

    /**
     * Get start y position
     * @override
     * @return {number} Start y position
     */
    get startY(): number {
        return this.startYVal;
    }

    /**
     * Get end x position
     * @override
     * @return {number} End x position
     */
    get endX(): number {
        return this.endXVal;
    }

    /**
     * Get end y position
     * @override
     * @return {number} End y position
     */
    get endY(): number {
        return this.endYVal;
    }

    /**
     * Update AABB
     * @override
     * @param {number} startX Relative x coordinate of the upper left
     * @param {number} startY Relative y coordinate of the upper left
     * @param {number} endX Relative x coordinate of the lower right
     * @param {number} endY Relative y coordinate of the lower right
     * @param {Entity} entity Entity attaced it
     */
    update(startX: number, startY: number, endX: number, endY: number, entity: Entity) {
        this.startXVal = entity.x + startX;
        this.startYVal = entity.y + startY;
        this.endXVal = entity.x + endX;
        this.endYVal = entity.y + endY;
    }
}
