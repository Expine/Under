/**
 * Adventurer jump state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - Basic information can be transferred to another state
 * - Render entity by entity own image ID for change type
 * - Sets max velocity and move power for moving
 * - Enable to set velocity and power
 * - To fall, walk and stop
 * - ### It can drag hook
 * @extends {NormalJumpingState}
 * @classdesc Adventurer jump state that can drag hook
 */
class AdventurerJumpingState extends NormalJumpingState { // eslint-disable-line  no-unused-vars
    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // drag hook
        if (Input.key.isPressed(Input.key.up())) {
            for (let it of this.entity.collider.collisions) {
                let you = Util.getCollidedEntity(this.entity, it);
                if (BaseUtil.implementsOf(you, IHook) && !you.isHead() && you.getActor() === this.entity) {
                    if (you.tryRemove()) {
                        return true;
                    }
                }
            }
        }
        return super.apply(dt);
    }
}
