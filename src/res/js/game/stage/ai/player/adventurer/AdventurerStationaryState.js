/**
 * Adventurer stationary state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - Basic information can be transferred to another state
 * - Render entity by entity own image ID for change type
 * - Sets max velocity and move power for moving
 * - Enable to set velocity and power
 * - To walk, jump, grab, attack, special and fall
 * - ### It can drag hook
 * @extends {NormalStationaryState}
 * @classdesc Adventurer stationary state that can drag hook
 */
class AdventurerStationaryState extends NormalStationaryState {
    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // drag hook
        if (Input.key.isPressed(Input.key.up())) {
            for (const it of this.entity.collider.collisions) {
                const you = Util.getCollidedEntity(this.entity, it);
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
