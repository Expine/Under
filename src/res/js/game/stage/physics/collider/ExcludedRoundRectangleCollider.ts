import { RoundRectangleCollider } from "../../../../under/extend/stage/physics/collider/RoundRectangleCollider";
import { IExclude, isIExclude } from "./IExclude";
import { Collider } from "../../../../under/base/stage/physics/collider/Collider";

/**
 * Excluded round rectangle collider
 * - Excludes some colliders
 * @extends {RoundRectangleCollider}
 * @implements {IExclude}
 * @classdesc Excluded round rectangle collider to exclude some collider
 */
export class ExcludedRoundRectangleCollider extends RoundRectangleCollider implements IExclude {
    /**
     * Excluded target ID
     * @protected
     * @type {number}
     */
    protected targetID: number;

    /**
     * Excluded round rectangle collider constructor
     * @constructor
     * @param {number} startX X coordinate of upper left corner of rectangle
     * @param {number} startY Y coordinate of upper left corner of rectangle
     * @param {number} width Width of rectangle
     * @param {number} height Height of rectangle
     * @param {number} cut Amount of taken horn
     * @param {number} targetID Excluded target ID
     */
    constructor(startX: number, startY: number, width: number, height: number, cut: number, targetID: number) {
        super(startX, startY, width, height, cut);

        this.targetID = targetID;
    }

    /**
     * Get excluded target ID
     * @override
     * @type {number}
     */
    getTargetID() {
        return this.targetID;
    }

    /**
     * Set whether to perform collision response or not
     * @override
     * @param {Collider} collider Target collider
     * @return {boolean} whether to perform collision response or not
     */
    isResponse(collider: Collider): boolean {
        return super.isResponse(collider) && (!isIExclude(collider) || this.targetID !== collider.getTargetID());
    }
}
