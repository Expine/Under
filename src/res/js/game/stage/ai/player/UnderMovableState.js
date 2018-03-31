/**
 * Under player state that can be movable
 * Render entity by entity own image ID for change type
 * @extends {UnderPlayerState}
 * @classdesc Under player state to render entity by entity own image ID
 */
class UnderMovableState extends UnderPlayerState /* , MovableState */ { // eslint-disable-line  no-unused-vars
    /**
     * Under movable state constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Maximum speed x vector
         * @protected
         * @type {number}
         */
        this.maxVelocityX = 0;
        /**
         * Maximum speed y vector
         * @protected
         * @type {number}
         */
        this.maxVelocityY = 0;

        /**
         * Force of x direction applied when moving
         * @protected
         * @type {number}
         */
        this.movePowerX = 0;
        /**
         * Force of x direction applied when moving
         * @protected
         * @type {number}
         */
        this.movePowerY = 0;
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
}
