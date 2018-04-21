/**
 * Adventurer hook state
 * - Determines the operation by AI according to the state and renders based on state
 * - Enable to set animation
 * - Base state for rendering state animation
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
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        // generate hook
        if (this.stateAnimation.isEnded()) {
            let hook = new HookHead(this.entity.x + this.entity.width / 2, this.entity.y + this.entity.height / 2, 32, 32, this.entity, 4, 400, 300);
            hook.body.enforce(1200000 * this.entity.directionX / dt, -2000000 / dt);
            this.entity.stage.addEntity(hook);
            this.ai.changeState(`stationary`);
        }
        return true;
    }
}
