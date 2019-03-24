import { BaseState } from "../state/BaseState";
import { Input } from "../../../../base/input/Input";
import { Util } from "../../../util/Util";
import { Context } from "../../../../base/resources/image/Context";

/**
 * Player jump state
 * - Decides actions while jumping
 * @extends {BaseState}
 * @classdesc Player jump state to decide actions while jumping
 */
export class PJumpingState extends BaseState {
    /**
     * Maximum speed vector
     * @protected
     * @type {number}
     */
    protected maxVelocityX: number;
    /**
     * Force applied when moving
     * @protected
     * @type {number}
     */
    protected movePower: number;

    /**
     * Player jump state constructor
     * @constructor
     * @param {number} maxVelocityX Maximum speed
     * @param {number} movePower The power to move in the air
     */
    constructor(maxVelocityX: number, movePower: number) {
        super();

        this.maxVelocityX = maxVelocityX;
        this.movePower = movePower;
    }

    /**
     * Update state
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
    apply(dt: number): boolean {
        // input
        let vx = 0;
        if (Input.key.isPressed(Input.key.left())) {
            vx += -1;
        }
        if (Input.key.isPressed(Input.key.right())) {
            vx += 1;
        }
        if (this.entity !== null && this.entity.body !== null) {
            if (vx !== 0) {
                this.entity.setDirection(vx);
                if (this.entity.body.velocityX * vx < 0 || Math.abs(this.entity.body.velocityX) < Math.abs(this.maxVelocityX)) {
                    this.entity.body.enforce(this.movePower * vx / dt, 0);
                }
            }
            if (Util.onGround(this.entity) && this.ai !== null) {
                if (Math.abs(this.entity.body.velocityX) < 100) {
                    this.ai.changeState(`stationary`);
                } else {
                    this.ai.changeState(`walk`);
                }
            }
        }
        return true;
    }

    /**
     * Render entity by this state
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    render(_ctx: Context, _shiftX: number, _shiftY: number) { }
}
