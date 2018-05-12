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
        this.py = -1000000000;
        this.priority = null;
    }

    /**
     * Calculate descending priority
     * @override
     * @return {number} Priority
     */
    calcPriority() {
        if (this.priority != null) {
            return this.priority;
        }
        return this.priority = this.py;
    }
}
