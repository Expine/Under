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
        let hooks = this.entity.stage.getEntities().filter((it) => it instanceof HookObject);
        if (hooks.length >= 1) {
            for (let it of hooks) {
                it.ai[0].changeState(`released`);
            }
        }
    }
}
