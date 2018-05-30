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
     *
     * Make attack object
     * @protected
     * @return {Entity} Attack object
     */
    makeAttackObject() {
        const attack = this.entity.stage.addEntityByID(200002, {
            x: this.entity.x + (this.entity.directionX === 1 ? this.entity.width - 22 : -26),
            y: this.entity.y + 8,
            z: this.entity.z + 1,
            owner: this.entity,
        });
        if (attack instanceof MutableEntity) {
            attack.setDirection(this.entity.directionX);
        }
        return attack;
    }
    /**
     * Update state
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        const image = this.entity.getImage();
        if (image !== null) {
            image.update(dt);
        }
        super.update(dt);
    }
}
