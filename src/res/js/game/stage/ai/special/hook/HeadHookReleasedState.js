/**
 * Head hook released state
 * Hook condition before collision
 * @implements {HookReleasedState}
 * @classdesc Head hook released state before collision
 */
class HeadHookReleasedState extends HookReleasedState { // eslint-disable-line  no-unused-vars
    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        super.apply(dt);
        // check collisions
        for (let it of this.entity.collider.collisions) {
            let you = Util.getCollidedEntity(this.entity, it);
            if (you === this.actor) {
                if (BaseUtil.implementsOf(this.entity, Breakable)) {
                    this.entity.destroy();
                }
            }
        }
    }
}
