/**
 * State of wild clawing
 * @extends {PPunchState}
 * @classdesc State of wild clawing
 */
class WildClawState extends PPunchState { // eslint-disable-line  no-unused-vars
    /**
     * Make attack object
     * @return {AttackObject}
     */
    makeAttackObject() {
        return new PunchObject(this.entity.x + this.entity.directionX * (this.entity.width + 10), this.entity.y);
    }
}
