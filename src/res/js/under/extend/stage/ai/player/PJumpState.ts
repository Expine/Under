import { BaseState } from "../state/BaseState";
import { Input } from "../../../../base/input/Input";
import { Util } from "../../../util/Util";
import { Context } from "../../../../base/resources/image/Context";

/**
 * Player jump state
 * - Prepares for jumping
 * @extends {BaseState}
 * @classdesc Player jump state to prepare for jumping
 */
export class PJumpState extends BaseState {
    /**
     * Count for judging on air
     * @protected
     * @type {number}
     */
    protected inAirCount: number;

    /**
     * Jump button pressed time
     * @protected
     * @type {number}
     */
    protected jumpPressedTime: number;
    /**
     * Jump time
     * @protected
     * @type {number}
     */
    protected jumpDeltaTime: number;

    /**
     * Jumping force
     * @protected
     * @type {number}
     */
    protected jumpPower: number;

    /**
     * Reserved velocity of X
     * @protected
     * @type {number}
     */
    protected reservedVelocityX: number;

    /**
     * Player jump state constructor
     * @constructor
     * @param {number} jumpPower Jumping force
     */
    constructor(jumpPower: number) {
        super();

        this.inAirCount = 0;
        this.jumpPressedTime = 0;
        this.jumpDeltaTime = 0;
        this.jumpPower = jumpPower;
        this.reservedVelocityX = 0;
    }

    /**
     * Initialize
     * @override
     */
    init() {
        super.init();
        this.inAirCount = 0;
        this.jumpPressedTime = 0;
        this.jumpDeltaTime = 0;
        if (this.entity !== null && this.entity.body !== null) {
            this.reservedVelocityX = this.entity.body.velocityX;
        }
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
        // animation
        if (this.entity !== null && this.entity.body !== null) {
            this.entity.body.setNextAddVelocity(-this.entity.body.velocityX / 11, 0);
            if (Input.key.isPressed(Input.key.up())) {
                this.jumpPressedTime += 1;
            }
            this.jumpDeltaTime += 1;

            // judge
            if (!Util.onGround(this.entity) && this.ai !== null) {
                if (++this.inAirCount > 5) {
                    this.ai.changeState(`stationary`);
                }
            } else {
                this.inAirCount = 0;
            }
            const image = this.entity.getImage();
            if (image !== null && this.entity.material !== null && this.ai !== null && Util.canEnd(image) && this.inAirCount === 0) {
                // reset and jump
                this.entity.body.setNextAddVelocity(this.reservedVelocityX * 0.8 - this.entity.body.velocityX, -this.entity.body.velocityY);
                this.entity.body.enforce(0, -this.jumpPower * this.entity.material.mass * 1000 / dt * (this.jumpPressedTime + this.jumpDeltaTime) / 2 / this.jumpDeltaTime);
                this.ai.changeState(`jumping`);
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
