/**
 * Normal jump state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - Basic information can be transferred to another state
 * - Sets the power to be applied and the magnification of the elapsed speed of the preparation time
 * - ### Prepares for jumping
 * @extends {UnderPlayerState}
 * @implements {IPrepareState}
 * @classdesc Normal jump state to prepare for jumping
 */
class NormalJumpState extends UnderPlayerState /* , IPrepareState */ { // eslint-disable-line  no-unused-vars
    /**
     * Normal jump state constructor
     * @constructor
     * @param {number} jumpPower Jumping force
     */
    constructor(jumpPower) {
        super();

        /**
         * Jumping force
         * @protected
         * @type {number}
         */
        this.jumpPower = jumpPower;

        /**
         * Count for judging on air
         * @protected
         * @type {numebr}
         */
        this.inAirCount = 0;

        /**
         * Jump button pressed time
         * @protected
         * @type {number}
         */
        this.jumpPressedTime = 0;
        /**
         * Jump time
         * @protected
         * @type {number}
         */
        this.jumpDeltaTime = 0;

        /**
         * Animation speed magnification
         * @protected
         * @type {number}
         */
        this.animationMagnification = 1;

        /**
         * Reserved velocity of X
         * @protected
         * @type {number}
         */
        this.reservedVelocityX = 0;
    }

    /**
     * Set the magnification of the elapsed speed of the preparation time
     * @override
     * @param {number} val The magnification of the elapsed speed of the preparation time
     */
    set speedMagnification(val) {
        this.animationMagnification = val;
    }

    /**
     * Set the power to be applied
     * @override
     * @param {number} val The power to be applied
     */
    set appliedPower(val) {
        this.jumpPower = val;
    }

    /**
     * Get the magnification of the elapsed speed of the preparation time
     * @override
     * @return {number} The magnification of the elapsed speed of the preparation time
     */
    get speedMagnification() {
        return this.animationMagnification;
    }

    /**
     * Get the power to be applied
     * @override
     * @return {number} The power to be applied
     */
    get appliedPower() {
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
        this.reservedVelocityX = this.entity.body.velocityX;
    }

    /**
     * Update state
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        let image = this.entity.getImage();
        if (image !== null) {
            image.update(dt * (this.animationMagnification - 1));
        }
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        this.entity.body.setNextAddVelocity(-this.entity.body.velocityX / 11, 0);
        if (Input.key.isPressed(Input.key.up())) {
            this.jumpPressedTime += 1;
        }
        this.jumpDeltaTime += 1;

        // judge
        if (!Util.onGround(this.entity)) {
            if (++this.inAirCount > 5) {
                this.ai.changeState(`stationary`);
            }
        } else {
            this.inAirCount = 0;
        }
        if (Util.canEnd(this.entity.getImage()) && this.inAirCount == 0) {
            // reset and jump
            this.entity.body.setNextAddVelocity(this.reservedVelocityX * 0.8 - this.entity.body.velocityX, -this.entity.body.velocityY);
            this.entity.body.enforce(0, -this.jumpPower * this.entity.material.mass * 1000 / dt * (this.jumpPressedTime + this.jumpDeltaTime) / 2 / this.jumpDeltaTime);
            this.ai.changeState(`jumping`);
        }

        return true;
    }
}
