/**
 * Adventurer hook state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - Basic information can be transferred to another state
 * - Render entity by entity own image ID for change type
 * - ### It can generate and release hook
 * @extends {UnderPlayerState}
 * @classdesc Adventurer hook state that can generate and release hook
 */
class AdventurerHookState extends UnderPlayerState { // eslint-disable-line  no-unused-vars
    /**
     * Initilaize state
     * @override
     */
    init() {
        super.init();
        let hooks = this.entity.stage.getEntities().filter((it) => BaseUtil.implementsOf(it, IHook));
        if (hooks.length >= 1) {
            for (let it of hooks) {
                if (it.getActor() === this.entity) {
                    it.release();
                }
            }
            if (Util.onGround(this.entity)) {
                this.ai.changeState(`falling`);
            } else if (this.entity.body.isFixX) {
                this.ai.changeState(`stationary`);
            } else {
                this.ai.changeState(`walk`);
            }
        }
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // generate hook
        if (Util.canEnd(this.entity.getImage())) {
            let hook = new HookHead(4, 400, 300);
            hook.setPosition(this.entity.x + this.entity.width / 2, this.entity.y + this.entity.height / 2, this.entity.z - 1);
            hook.setSize(32, 32);
            hook.setOwner(this.entity);
            this.entity.stage.addEntity(hook);
            hook.body.enforce(1200000 * this.entity.directionX / dt, -2000000 / dt);
            this.ai.changeState(`stationary`);
        }
        return true;
    }
}
