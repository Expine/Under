/**
 * State interface that can move
 * @implements {Interface}
 */
class MovableState extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Breakable constructor
     * @constructor
     */
    constructor() {
        super();
        this.addMethod(this.setMovePower);
        this.addMethod(this.setMaxVelocity);
    }

    /**
     * Set max velocity
     * @interface
     * @param {number} maxVelocityX The max velocity of x direction
     * @param {number} maxVelocityY The max velocity of y direction
     */
    setMaxVelocity(maxVelocityX, maxVelocityY) {}

    /**
     * Set moving power
     * @interface
     * @param {number} movePowerX The power of x direction
     * @param {number} movePowerY The power of y direction
     */
    setMovePower(movePowerX, movePowerY) {}
}
