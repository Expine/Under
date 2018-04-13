/**
 * State of noraml stationary
 * @implements {UnderMovableState}
 * @classdesc State of normal stationary
 */
class NormalStationaryState extends UnderMovableState { // eslint-disable-line  no-unused-vars
    /**
     * Normal stationary state constructor
     * @constructor
     * @param {number} maxVelocityX Maximum speed
     * @param {number} walkPower The power to walk
     */
    constructor(maxVelocityX, walkPower) {
        super();


        this.maxVelocityX = maxVelocityX;
        this.movePowerX = walkPower;

        /**
         * Falling count
         * @protected
         * @type {number}
         */
        this.fallCount = 0;
    }

    /**
     * Initialize state
     * @override
     */
    init() {
        this.fallCount = 0;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        let vx = 0;
        // walk
        if (Input.it.isPressed(Input.key.left())) {
            vx += -1;
        }
        if (Input.it.isPressed(Input.key.right())) {
            vx += 1;
        }
        if (vx != 0) {
            this.entity.directionX = vx;
            if (this.entity.body.velocityX * vx < 0 || Math.abs(this.entity.body.velocityX) < this.maxVelocityX) {
                this.entity.body.enforce(vx * this.movePowerX * this.entity.material.mass / dt, 0);
            }
            this.ai.changeState(`walk`);
        }
        if (Util.onGround(this.entity)) {
            if (Input.it.isPressed(Input.key.down())) {
                this.ai.changeState(`grab`);
            }
            if (Input.it.isPressed(Input.key.up())) {
                if (vx != 0) {
                    this.ai.changeState(`walkjump`);
                } else {
                    this.ai.changeState(`jump`);
                }
            }
            if (Input.it.isPress(Input.key.yes())) {
                this.ai.changeState(`attack`);
            }
            if (Input.it.isPress(Input.key.sub())) {
                this.ai.changeState(`special`);
            }
            this.fallCount = 0;
        } else {
            if (++this.fallCount == 2) {
                this.ai.changeState(`fall`);
            }
        }
        return true;
    }
}
