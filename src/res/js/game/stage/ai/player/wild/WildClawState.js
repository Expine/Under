/**
 * Wild claw state
 * - Determines the operation by AI according to the state and renders based on state
 * - Enable to set animation
 * - Base state for rendering state animation
 * - Basic information can be transferred to another state
 * - About to attack
 * - ### Attacks by claw
 * @extends {NormalPunchState}
 * @classdesc Wild claw state to attack by claw
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

    // TODO: Should imeplement claw
    /**
     *
     * Make attack object
     * @return {AttackObject}
     */
    makeAttackObject() {
        let punch = new PunchObject();
        let x = this.entity.x + (this.entity.directionX == 1 ? this.entity.width - 22 : -64 + 22);
        punch.setPosition(x, this.entity.y, this.entity.z + 1);
        punch.setSize(64, 64);
        punch.setOwner(this.entity);
        return punch;
    }
}
