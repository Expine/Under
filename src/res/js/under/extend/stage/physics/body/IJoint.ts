import { Entity } from "../../../../base/stage/entity/Entity";

/**
 * Joint interface
 * - It can joint to something
 * @interface
 * @classdesc Joint interface that can joint to something
 */
export interface IJoint {
    /**
     * Joint to something
     * @abstract
     * @param {Entity} jointed Jointed entity
     * @param {number} jointedX Jointed x position
     * @param {number} jointedY Jointed y position
     * @param {number} length Jointed length
     */
    joint(jointed: Entity, jointedX: number, jointedY: number, length: number): void;

    /**
     * Unjoint
     * @abstract
     */
    unjoint(): void;
}
