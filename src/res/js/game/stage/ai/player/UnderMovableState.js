/**
 * Under movable state that can be movable
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - Basic information can be transferred to another state
 * - Render entity by entity own image ID for change type
 * - Sets max velocity and move power for moving
 * - ### Enable to set velocity and power
 * @implements {UnderPlayerState}
 * @implements {IMovableState}
 * @classdesc Under movable state to enable to set velocity and power
 */
class UnderMovableState extends UnderPlayerState /* , IMovableState */ { // eslint-disable-line  no-unused-vars
    /**
     * Under movable state constructor
     * @constructor
     * @param {number} maxVeocityX Maximum speed x vector
     * @param {number} maxVeocityY Maximum speed y vector
     * @param {number} movePowerX Force of x direction applied when moving
     * @param {number} movePowerY Force of y direction applied when moving
     */
    constructor(maxVelocityX, maxVelocityY, movePowerX, movePowerY) {
        super();

        /**
         * Maximum speed x vector
         * @protected
         * @type {number}
         */
        this.maxVelocityX = maxVelocityX;
        /**
         * Maximum speed y vector
         * @protected
         * @type {number}
         */
        this.maxVelocityY = maxVelocityY;

        /**
         * Force of x direction applied when moving
         * @protected
         * @type {number}
         */
        this.movePowerX = movePowerX;
        /**
         * Force of x direction applied when moving
         * @protected
         * @type {number}
         */
        this.movePowerY = movePowerY;
    }

    /**
     * Get max velocity of x
     * @override
     * @return {number} Max velocity of x
     */
    get maxVX() {
        return this.maxVelocityX;
    }

    /**
     * Get max velocity of y
     * @override
     * @return {number} Max velocity of y
     */
    get maxVY() {
        return this.maxVelocityY;
    }

    /**
     * Get power of x
     * @override
     * @return {number} Power of x
     */
    get movePX() {
        return this.movePowerX;
    }

    /**
     * Get power of y
     * @override
     * @return {number} Power of y
     */
    get movePY() {
        return this.movePowerY;
    }

    /**
     * Set max velocity
     * @override
     * @param {number} maxVelocityX The max velocity of x direction
     * @param {number} maxVelocityY The max velocity of y direction
     */
    setMaxVelocity(maxVelocityX, maxVelocityY) {
        this.maxVelocityX = maxVelocityX;
        this.maxVelocityY = maxVelocityY;
    }

    /**
     * Set moving power
     * @override
     * @param {number} movePowerX The power of x direction
     * @param {number} movePowerY The power of y direction
     */
    setMovePower(movePowerX, movePowerY) {
        this.movePowerX = movePowerX;
        this.movePowerY = movePowerY;
    }

    /**
     * Move x direction by input
     * @protected
     * @param {number} vx X direction
     * @param {number} dt Delta time
     */
    moveX(vx, dt) {
        this.entity.directionX = vx;
        if (this.entity.body.velocityX * vx < 0 || Math.abs(this.entity.body.velocityX) < Math.abs(this.maxVelocityX)) {
            this.entity.body.enforce(this.movePowerX * this.entity.material.mass * vx / dt, 0);
        }
    }

    /**
     * Move y direction by input
     * @protected
     * @param {number} vy y direction
     * @param {number} dt Delta time
     */
    moveY(vy, dt) {
        this.entity.directionX = vy;
        if (this.entity.body.velocityY * vy < 0 || Math.abs(this.entity.body.velocityY) < Math.abs(this.maxVelocityY)) {
            this.entity.body.enforce(0, this.movePowerY * this.entity.material.mass * vy / dt);
        }
    }

    /**
     * Move by input
     * @protected
     * @param {number} dt Delta time
     * @return {boolean} Whether move or not
     */
    moveByInput(dt) {
        let moved = false;
        // input
        if (this.movePowerX > 0) {
            let vx = 0;
            if (Input.key.isPressed(Input.key.left())) {
                vx += -1;
            }
            if (Input.key.isPressed(Input.key.right())) {
                vx += 1;
            }
            if (vx != 0) {
                this.moveX(vx, dt);
                moved = true;
            }
        }
        if (this.movePowerY > 0) {
            let vy = 0;
            if (Input.key.isPressed(Input.key.up())) {
                vy += -1;
            }
            if (Input.key.isPressed(Input.key.down())) {
                vy += 1;
            }
            if (vy != 0) {
                this.moveY(vy, dt);
                moved = true;
            }
        }
        return moved;
    }
}
