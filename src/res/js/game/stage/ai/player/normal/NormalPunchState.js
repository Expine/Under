/**
 * State of normal punching
 * @implements {UnderPlayerState}
 * @classdesc State of normal punching
 */
class NormalPunchState extends UnderPlayerState { // eslint-disable-line  no-unused-vars
    /**
     * Make attack object
     * @protected
     * @return {AttackObject} Attack object
     */
    makeAttackObject() {
        return new PunchObject(this.entity.x + this.entity.directionX * (this.entity.width + 10), this.entity.y);
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        // punch
        this.entity.stage.addEntity(this.makeAttackObject());
        // change state
        if (Math.abs(this.entity.body.preVelocityX) < 10) {
            this.ai.changeState(`stationary`);
        } else {
            this.ai.changeState(`walk`);
        }
        return true;
    }
}
