import { UnderPlayerState } from "../UnderPlayerState";
import { IPrepareState } from "../../IPrepareState";
import { Input } from "../../../../../under/base/input/Input";
import { Util } from "../../../../../under/extend/util/Util";
import { Context } from "../../../../../under/base/resources/image/Context";
import { TransferableState } from "../../state/TransferableState";

/**
 * Normal jump state
 * - Prepares for jumping
 * @extends {UnderPlayerState}
 * @implements {IPrepareState}
 * @classdesc Normal jump state to prepare for jumping
 */
export class NormalJumpState extends UnderPlayerState implements IPrepareState {
    /**
     * Jumping force
     * @protected
     * @type {number}
     */
    protected jumpPower: number;

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
     * Animation speed magnification
     * @protected
     * @type {number}
     */
    protected animationMagnification: number;

    /**
     * Reserved velocity of X
     * @protected
     * @type {number}
     */
    protected reservedVelocityX: number;

    /**
     * Normal jump state constructor
     * @constructor
     * @param {number} jumpPower Jumping force
     */
    constructor(jumpPower: number) {
        super();

        this.jumpPower = jumpPower;
        this.inAirCount = 0;
        this.jumpPressedTime = 0;
        this.jumpDeltaTime = 0;
        this.animationMagnification = 1;
        this.reservedVelocityX = 0;
    }

    /**
     * Set the magnification of the elapsed speed of the preparation time
     * @override
     * @param {number} val The magnification of the elapsed speed of the preparation time
     */
    setSpeedMagnification(val: number) {
        this.animationMagnification = val;
    }

    /**
     * Set the power to be applied
     * @override
     * @param {number} val The power to be applied
     */
    setAppliedPower(val: number) {
        this.jumpPower = val;
    }

    /**
     * Get the magnification of the elapsed speed of the preparation time
     * @override
     * @return {number} The magnification of the elapsed speed of the preparation time
     */
    getSpeedMagnification(): number {
        return this.animationMagnification;
    }

    /**
     * Get the power to be applied
     * @override
     * @return {number} The power to be applied
     */
    getAppliedPower(): number {
        return this.jumpPower;
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
    update(dt: number) {
        if (this.entity !== null) {
            const image = this.entity.getImage();
            if (image !== null) {
                image.update(dt * (this.animationMagnification - 1));
            }
        }
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt: number): boolean {
        if (this.entity === null || this.entity.body === null) {
            return true;
        }
        this.entity.body.setNextAddVelocity(-this.entity.body.velocityX / 11, 0);
        if (Input.key.isPressed(Input.key.up())) {
            this.jumpPressedTime += 1;
        }
        this.jumpDeltaTime += 1;

        // judge
        if (!Util.onGround(this.entity)) {
            if (++this.inAirCount > 5 && this.ai !== null) {
                this.ai.changeState(`stationary`);
            }
        } else {
            this.inAirCount = 0;
        }
        const image = this.entity.getImage();
        if (image !== null && Util.canEnd(image) && this.inAirCount === 0 && this.entity.material !== null && this.ai !== null) {
            // reset and jump
            this.entity.body.setNextAddVelocity(this.reservedVelocityX * 0.8 - this.entity.body.velocityX, -this.entity.body.velocityY);
            this.entity.body.enforce(0, -this.jumpPower * this.entity.material.mass * 1000 / dt * (this.jumpPressedTime + this.jumpDeltaTime) / 2 / this.jumpDeltaTime);
            this.ai.changeState(`jumping`);
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

    /**
     * Transfer information to another state
     * @override
     * @param {TransferableState} state Where to give information
     */
    transfer(_state: TransferableState) { }
}
