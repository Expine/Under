import { AI } from "../../../base/stage/ai/AI";
import { Util } from "../../util/Util";

/**
 * Straight AI
 * - AI to go straight ahead and reverses direction if it hit something
 * @extends {AI}
 * @classdesc Straight AI to go straight ahead and reverses direction if it hit something
 */
export class StraightAI extends AI {
    /**
     * Maximum speed vector of x
     * @protected
     * @type {number}
     */
    protected maxVelocityX: number;
    /**
     * Force applied when moving
     * @protected
     * @type {number}
     */
    protected walkPower: number;

    /**
     * Straight AI Constructor
     * @constructor
     * @param {number} mvx Maximum speed vector of x
     * @param {number} px Force applied when moving
     */
    constructor(mvx: number, px: number) {
        super();
        this.maxVelocityX = mvx;
        this.walkPower = px;
    }

    /**
     * Initialize AI
     * @override
     */
    init() { }

    /**
     * Update AI
     * @override
     * @param {number} dt Delta time
     */
    update(_dt: number) { }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(_dt: number): boolean {
        // check on ground
        if (this.entity === null) {
            return false;
        }
        if (!Util.onGround(this.entity)) {
            return true;
        }
        if (Util.getSideEntity(this.entity)) {
            this.entity.setDirection(this.entity.directionX * -1);
        }
        if (this.entity.body !== null && this.entity.material !== null && Math.abs(this.entity.body.velocityX) < this.maxVelocityX) {
            this.entity.body.enforce(this.entity.directionX * this.walkPower * this.entity.material.mass, 0);
        }
        return true;
    }
}
