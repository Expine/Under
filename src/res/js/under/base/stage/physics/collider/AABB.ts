import { Entity } from "../../entity/Entity";

/**
 * Axis Aligned Bounding Box
 * - Uses for rough collision determination
 * @abstract
 * @classdesc Axis Aligned Bounding Box to use for rough collision determination
 */
export abstract class AABB {
    /**
     * Get start x position
     * @abstract
     * @return {number} Start x position
     */
    abstract get startX(): number;

    /**
     * Get start y position
     * @abstract
     * @return {number} Start y position
     */
    abstract get startY(): number;

    /**
     * Get end x position
     * @abstract
     * @return {number} End x position
     */
    abstract get endX(): number;

    /**
     * Get end y position
     * @abstract
     * @return {number} End y position
     */
    abstract get endY(): number;

    /**
     * Update AABB
     * @abstract
     * @param {number} startX Relative x coordinate of the upper left
     * @param {number} startY Relative y coordinate of the upper left
     * @param {number} endX Relative x coordinate of the lower right
     * @param {number} endY Relative y coordinate of the lower right
     * @param {Entity} entity Entity attaced it
     */
    abstract update(startX: number, startY: number, endX: number, endY: number, entity: Entity): void;
}
