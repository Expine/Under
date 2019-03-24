import { CollisionData } from "../../../../base/stage/physics/collider/CollisionData";
import { Obstacle } from "../../entity/Obstacle";

/**
 * Lower priority data
 * - Prioritizes what collision point is below
 * @classdesc Lower priority data to prioritize what collision point is below
 */
export class LowerPriorityData extends CollisionData {
    /**
     * Lower priority constructor
     * @constructor
     */
    constructor() {
        super(new Obstacle(), new Obstacle(), 0, 0, 0, 0, 0);
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
