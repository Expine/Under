/**
 * State of walking normally
 * @implements {UnderMovableState}
 * @classdesc State of walking normally
 */
class NormalWalkState extends UnderMovableState { // eslint-disable-line  no-unused-vars
    /**
     * Normal walk state constructor
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
     * @param {number} dt - delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        // input
        let input = false;
        let vx = 0;
        // walk
        if (Input.it.isKeyPressed(Input.it.left)) {
            vx += -1;
            input = true;
        }
        if (Input.it.isKeyPressed(Input.it.right)) {
            vx += 1;
            input = true;
        }
        if (vx != 0) {
            this.entity.directionX = vx;
            if (this.entity.body.preVelocityX * vx < 0 || Math.abs(this.entity.body.preVelocityX) < this.maxVelocityX) {
                this.entity.body.enforce(vx * this.movePowerX * this.entity.material.mass / dt, 0);
            }
        }
        // stationary
        if (!input) {
            this.ai.changeState(`stationary`);
        }
        if (Util.onGround(this.entity)) {
            if (Input.it.isKeyPressed(Input.it.down)) {
                this.ai.changeState(`grab`);
            }
            if (Input.it.isKeyPressed(Input.it.up)) {
                this.ai.changeState(`walkjump`);
            }
            if (Input.it.isKeyPress(Input.it.yes)) {
                this.ai.changeState(`attack`);
            }
            if (Input.it.isKeyPress(Input.it.sub)) {
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
