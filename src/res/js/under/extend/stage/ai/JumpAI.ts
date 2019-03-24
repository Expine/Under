import { AI } from "../../../base/stage/ai/AI";
import { Util } from "../../util/Util";

/**
 * Jump AI
 * - Jumps
 * @extends {AI}
 * @classdesc Jump AI to jump
 */
export class JumpAI extends AI {
    /**
     * Jumping force
     * @protected
     * @type {number}
     */
    protected jumpPower: number;

    /**
     * On ground counter
     * @protected
     * @type {number}
     */
    protected onGroundCount: number;
    /**
     * Jumped conter
     * @protected
     * @type {number}
     */
    protected jumpedCount: number;

    /**
     * Jump AI Constructor
     * @constructor
     * @param {number} jumpPower Jumping power
     */
    constructor(jumpPower: number) {
        super();

        this.jumpPower = jumpPower;
        this.onGroundCount = 0;
        this.jumpedCount = 0;
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
    update(dt: number) {
        if (this.entity !== null && Util.onGround(this.entity)) {
            const image = this.entity.getImage();
            if (image !== null) {
                image.init();
            }
            this.onGroundCount += dt / 1000;
            this.jumpedCount -= dt / 1000;
        } else {
            this.jumpedCount = 1;
            this.onGroundCount = 0;
        }
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt: number): boolean {
        // judge
        if (this.entity !== null && this.entity.body !== null && this.entity.material !== null && this.onGroundCount > 1 && this.jumpedCount <= 0) {
            // reset and jump
            this.entity.body.enforce(0, -this.jumpPower * this.entity.material.mass * 1000 / dt);
        }
        return true;
    }
}
