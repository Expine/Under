/**
 * State of wild special action
 * @implements {UnderPlayerState}
 * @classdesc State of wild special action
 */
class WildSpecialState extends UnderPlayerState { // eslint-disable-line  no-unused-vars
    /**
     * Wild special state constructor
     * @constructor
     * @param {number} movePowerX The power of x direction to move in the air
     * @param {number} movePowerY The power of y direction to move in the air
     */
    constructor(movePowerX, movePowerY) {
        super();

        /**
         * Whether this jumped or not
         * @type {bool}
         */
        this.jumped = 0;

        /**
         * Force applied when moving
         * @protected
         * @type {number}
         */
        this.movePowerX = movePowerX;
        /**
         * Force applied when moving
         * @protected
         * @type {number}
         */
        this.movePowerY = movePowerY;
    }

    /**
     * Initialize state
     * @override
     */
    init() {
        super.init();
        this.jumped = false;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        if (this.stateAnimation.getAnimationCount() < 0.5) {
            return true;
        }
        if (!this.jumped) {
            // big jump
            this.entity.body.setNextAddVelocity(-this.entity.body.preVelocityX, 0);
            this.entity.body.enforce(this.movePowerX * this.entity.material.mass * this.entity.directionX / dt, -this.movePowerY * this.entity.material.mass / dt);
            this.jumped = true;
            return;
        }
        // change state
        if (Util.onGround(this.entity)) {
            this.entity.body.setNextAddVelocity(-this.entity.body.preVelocityX, 0);
            if (this.entity.body.isFix) {
                this.ai.changeState(`stationary`);
            } else {
                this.ai.changeState(`walk`);
            }
        }
        return true;
    }
}
