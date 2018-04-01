/**
 * State of wild clawing
 * @extends {NormalPunchState}
 * @classdesc State of wild clawing
 */
class WildClawState extends NormalPunchState { // eslint-disable-line  no-unused-vars
    /**
     * WIld claw state
     * @constructor
     */
    constructor() {
        super();

        this.threshold = 0.0;
    }
    /**
     *
     * Make attack object
     * @return {AttackObject}
     */
    makeAttackObject() {
        let x = this.entity.x + (this.entity.directionX == 1 ? this.entity.width - 22 : -64 + 22);
        return new PunchObject(x, this.entity.y, 64, 64, this.entity);
    }
}
