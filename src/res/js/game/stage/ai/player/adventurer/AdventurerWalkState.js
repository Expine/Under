/**
 * Adventurer walk state
 * - Determines the operation by AI according to the state and renders based on state
 * - Enable to set animation
 * - Base state for rendering state animation
 * - Basic information can be transferred to another state
 * - Render entity by entity own image ID for change type
 * - Sets max velocity and move power for moving
 * - Enable to set velocity and power
 * - To stop, jump, grab, attack, special and fall
 * - ### It can drag hook
 * @implements {NormalWalkState}
 * @classdesc Adventurer walk state that can drag hok
 */
class AdventurerWalkState extends NormalWalkState { // eslint-disable-line  no-unused-vars
    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // drag hook
        if (Input.it.isPressed(Input.key.up())) {
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
