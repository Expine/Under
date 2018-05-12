/**
 * Lower priority data
 * - Data obtained by collision detection
 * - ### Prioritizes what collision point is below
 * @classdesc Lower priority data to prioritize what collision point is below
 */
class LowerPriorityData extends CollisionData { // eslint-disable-line  no-unused-vars
    /**
     * Lower priority constructor
     * @constructor
     */
    constructor() {
        super(null, null, 0, 0, 0, 0, 0);
    }

    /**
     * Initialize collision data
     * @override
     */
    init() {
        super.init();
        this.py = -1000000000;
    }

    /**
     * Calculate descending priority
     * @override
     * @protected
     * @return {number} Priority
     */
    calcPriority() {
        return this.py;
    }
}
