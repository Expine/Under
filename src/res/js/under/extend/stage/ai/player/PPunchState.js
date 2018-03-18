/**
 * State of player punching
 * @implements {State}
 * @classdesc State of player punching
 */
class PPunchState extends State { // eslint-disable-line  no-unused-vars
    /**
     * Player punch state
     * @constructor
     */
    constructor() {
        super(`stationary`);
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
     * Make attack object
     * @return {AttackObject}
     */
    makeAttackObject() {
        return new PunchObject(this.entity.x + this.entity.direction * (this.entity.width + 10), this.entity.y);
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // punch
        this.entity.stage.addEntity(this.makeAttackObject());
        // change state
        if (Math.abs(this.entity.body.velocityX) < 10) {
            this.ai.changeState(this.makeStationaryState());
        } else {
            this.ai.changeState(this.makeWalkState());
        }
        return true;
    }
}
