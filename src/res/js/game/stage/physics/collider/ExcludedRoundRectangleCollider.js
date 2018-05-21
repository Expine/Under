/**
 * Excluded round rectangle collider
 * - Store collider data for judgeing collision
 * - Makes a collision judgment considered to be rectangle
 * - Makes a collision judgment considered to be rectangle taken a horn
 * - Acquire the ID of the exclusion target
 * - ### Excludes some colliders
 * @extends {RoundRectangleCollider}
 * @implements {IExclude}
 * @classdesc Excluded round rectangle collider to exclude some collider
 */
class ExcludedRoundRectangleCollider extends RoundRectangleCollider /* , IExclude */ { // eslint-disable-line  no-unused-vars
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
    constructor(startX, startY, width, height, cut, targetID) {
        super(startX, startY, width, height, cut);

        /**
         * Excluded target ID
         * @protected
         * @type {number}
         */
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
     * @param {Colllder} collider Target collider
     * @return {boolean} whether to perform collision response or not
     */
    isResponse(collider) {
        return super.isResponse() && (!BaseUtil.implementsOf(collider, IExclude) || !this.targetID === collider.getTargetID());
    }
}
