/**
 * Excluded rectangle collider
 * - Store collider data for judgeing collision
 * - Makes a collision judgment considered to be rectangle
 * - Acquire the ID of the exclusion target
 * - ### Excludes some colliders
 * @extends {RectangleCollider}
 * @implements {IExclude}
 * @classdesc Excluded rectangle collider to exclude some colliders
 */
class ExcludedRectangleCollider extends RectangleCollider /* , Excludedable */ { // eslint-disable-line  no-unused-vars
    /**
     * Excluded rectangle collider constructor
     * @constructor
     * @param {number} startX X coordinate of upper left corner of rectangle
     * @param {number} startY Y coordinate of upper left corner of rectangle
     * @param {number} width Width of rectangle
     * @param {number} height Height of rectangle
     * @param {number} targetID Excluded target ID
     */
    constructor(startX, startY, width, height, targetID) {
        super(startX, startY, width, height);

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
     * Judge whether collision
     * @override
     * @param {Colllder} collider
     * @param {CollisionData} data Pointer to save conflict information
     * @return {bool} whether collision

     */
    isCollision(collider, data) {
        if (BaseUtil.implementsOf(collider, IExclude) && this.targetID == collider.getTargetID()) {
            return false;
        }
        return super.isCollision(collider, data);
    }
}
