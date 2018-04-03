/**
 * State of adventurer grab
 * @implements {NormalGrabState}
 * @classdesc State of adventurer grab
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
