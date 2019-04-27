import { Input } from "../../../../base/input/Input";
import { BaseState } from "../state/BaseState";
import { Util } from "../../../util/Util";
import { Context } from "../../../../base/resources/image/Context";

/**
 * Player walk state
 * - Walks, jumps, and attacks
 * @extends {BaseState}
 * @classdesc Player walk state to walk, jump and attack
 */
export class PWalkState extends BaseState {
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
    protected walkPower: number;

    /**
     * Player walk state constructor
     * @constructor
     * @param {number} maxVelocityX Maximum speed
     * @param {number} walkPower The power to walk
     */
    constructor(maxVelocityX: number, walkPower: number) {
        super();

        this.maxVelocityX = maxVelocityX;
        this.walkPower = walkPower;
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
        let input = false;
        let vx = 0;
        // walk
        if (Input.key.isPressed(Input.key.left())) {
            vx += -1;
            input = true;
        }
        if (Input.key.isPressed(Input.key.right())) {
            vx += 1;
            input = true;
        }
        if (this.entity !== null && this.entity.body !== null && this.entity.material !== null) {
            if (vx !== 0) {
                this.entity.setDirection(vx);
                if (this.entity.body.velocityX * vx < 0 || Math.abs(this.entity.body.velocityX) < this.maxVelocityX) {
                    this.entity.body.enforce(vx * this.walkPower * this.entity.material.mass / dt, 0);
                }
            }
        }
        if (this.entity !== null && this.ai !== null) {
            // stationary
            if (!input) {
                this.ai.changeState('stationary');
            }
            if (Util.onGround(this.entity)) {
                // jump
                if (Input.key.isPressed(Input.key.up())) {
                    this.ai.changeState('walkjump');
                }
                // punch
                if (Input.key.isPress(Input.key.yes())) {
                    this.ai.changeState('attack');
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
