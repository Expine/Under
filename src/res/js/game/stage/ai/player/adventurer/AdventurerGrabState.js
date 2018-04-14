/**
 * Adventurer grab state
 * - Determines the operation by AI according to the state and renders based on state
 * - Enable to set animation
 * - Base state for rendering state animation
 * - Basic information can be transferred to another state
 * - Render entity by entity own image ID for change type
 * - Sets max velocity and move power for moving
 * - Enable to set velocity and power
 * - Manages grabed behavior
 * - ### If entity changed, all hook is released
 * @extends {NormalGrabState}
 * @classdesc Adventurer grab state that relase all hook if entity changed
 */
class AdventurerGrabState extends NormalGrabState { // eslint-disable-line  no-unused-vars
    /**
     * Type changed function
     * @override
     * @protected
     */
    changed() {
        let hooks = this.entity.stage.getEntities().filter((it) => BaseUtil.implementsOf(it, Hookable));
        for (let it of hooks) {
            if (it.getActor() === this.entity) {
                it.release();
            }
        }
    }
}
