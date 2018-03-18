/**
 * State of player jumping
 * @implements {State}
 * @classdesc State of player jumping
 */
class PJumpingState extends State { // eslint-disable-line  no-unused-vars
    /**
     * Player jumping state constructor
     * @constructor
     */
    constructor() {
        super(`jumping`);
    }
    /**
     * Make stationary state
     * @return {State} stationary state
     */
    makeStationaryState() {
        return new PStationaryState();
    }

    /**
     * Make walk state
     * @return {State} walk state
     */
    makeWalkState() {
        return new PWalkState();
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // input
        let vx = 0;
        if (Input.it.isLeftPressed()) {
            vx += -300;
        }
        if (Input.it.isRightPressed()) {
            vx += 300;
        }
        if (Math.abs(vx) > 0) {
            this.entity.directionX = Math.sign(vx);
            if (this.entity.body.velocityX * vx < 0 || Math.abs(this.entity.body.velocityX) < Math.abs(vx)) {
                this.entity.body.enforce(vx * 30 / dt, 0);
            } else {
                this.entity.body.velocityX = vx;
            }
        }
        if (Util.onGround(this.entity)) {
            if (Math.abs(this.entity.body.velocityX) < 10) {
                this.ai.changeState(this.makeStationaryState());
            } else {
                this.ai.changeState(this.makeWalkState());
            }
        }
        return true;
    }
}
