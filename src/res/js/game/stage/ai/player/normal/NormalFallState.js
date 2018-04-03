/**
 * State of normal fall
 * @implements {UnderMovableState}
 * @classdesc State of normal fall
 */
class NormalFallState extends UnderMovableState { // eslint-disable-line  no-unused-vars
    /**
     * Normal fall state constructor
     * @constructor
     * @param {number} maxVelocityX Maximum speed
     * @param {number} movePower The power to move in the air
     */
    constructor(maxVelocityX, movePower) {
        super();

        this.maxVelocityX = maxVelocityX;
        this.movePowerX = movePower;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        // input
        let vx = 0;
        if (Input.it.isKeyPressed(Input.it.left)) {
            vx += -1;
        }
        if (Input.it.isKeyPressed(Input.it.right)) {
            vx += 1;
        }
        if (vx != 0) {
            this.entity.directionX = vx;
            if (this.entity.body.preVelocityX * vx < 0 || Math.abs(this.entity.body.preVelocityX) < Math.abs(this.maxVelocityX)) {
                this.entity.body.enforce(this.movePowerX * this.entity.material.mass * vx / dt, 0);
            }
        }
        if (this.stateAnimation.isEnded() && !this.stateAnimation.isLoop()) {
            this.ai.changeState(`falling`);
        }
        if (Util.onGround(this.entity)) {
            if (this.entity.body.isFixX) {
                this.ai.changeState(`stationary`);
            } else {
                this.ai.changeState(`walk`);
            }
        }
        return true;
    }
}
