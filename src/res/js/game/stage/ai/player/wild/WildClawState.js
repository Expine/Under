/**
 * Wild claw state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
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

    /**
     *
     * Make attack object
     * @protected
     * @return {Entity} Attack object
     */
    makeAttackObject() {
        let punch = this.entity.stage.addEntityByID(200001);
        let x = this.entity.x + (this.entity.directionX === 1 ? this.entity.width - 22 : -64 + 22);
        punch.setPosition(x, this.entity.y, this.entity.z + 1);
        return punch;
    }
}
