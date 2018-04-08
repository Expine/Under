/**
 * Excluded round rectangle collider
 * @implements {RoundRectangleCollider}
 * @classdesc Collider for rectangle
 */
class ExcludedRoundRectangleCollider extends RoundRectangleCollider /* , Excludedable */ { // eslint-disable-line  no-unused-vars
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
     * Judge whether collision
     * @override
     * @param {Colllder} collider
     * @param {CollisionData} data Pointer to save conflict information
     * @return {bool} whether collision

     */
    isCollision(collider, data) {
        if (BaseUtil.implementsOf(collider, Excludedable) && this.targetID == collider.getTargetID()) {
            return false;
        }
        return super.isCollision(collider, data);
    }
}
