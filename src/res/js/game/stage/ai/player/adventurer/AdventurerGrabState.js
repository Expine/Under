/**
 * Adventurer grab state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
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
        super.changed();

        // auto release
        const hooks = this.entity.stage.getEntities().filter((it) => BaseUtil.implementsOf(it, IHook));
        for (const it of hooks) {
            if (it.getActor() === this.entity) {
                it.release();
            }
        }
    }
}
