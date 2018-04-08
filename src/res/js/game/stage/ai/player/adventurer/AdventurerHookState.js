/**
 * State of adventurer hooking
 * @extends {UnderPlayerState}
 * @classdesc State of adventurer hooking
 */
class AdventurerHookState extends UnderPlayerState { // eslint-disable-line  no-unused-vars
    /**
     * Initilaize state
     * @override
     */
    init() {
        super.init();
        let hooks = this.entity.stage.getEntities().filter((it) => BaseUtil.implementsOf(it, Hookable));
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
     * @param {number} dt - delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        if (this.stateAnimation.isEnded()) {
            let x = this.entity.x + (this.entity.directionX == 1 ? this.entity.width - 12 : 12);
            let hook = new HookHead(x, this.entity.y + 8, 32, 32, this.entity, 6, 1000);
            hook.body.enforce(6000000 * this.entity.directionX / dt, -10000000 / dt);
            // hook.body.enforce(6000000 * this.entity.directionX / dt, -3000000 / dt);
            this.entity.stage.addEntity(hook);
            this.ai.changeState(`stationary`);
        }
        return true;
    }
}
