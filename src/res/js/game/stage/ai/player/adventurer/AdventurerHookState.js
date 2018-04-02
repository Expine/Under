/**
 * State of adventurer hooking
 * @extends {UnderPlayerState}
 * @classdesc State of adventurer hooking
 */
class AdventurerHookState extends UnderPlayerState { // eslint-disable-line  no-unused-vars
    /**
     * Initialize state
     * @override
     */
    init() {
        super.init();
        let x = this.entity.x + (this.entity.directionX == 1 ? this.entity.width - 22 : -32 + 22);
        let hook = new HookObject(x, this.entity.y, 32, 32, this.entity);
        hook.body.enforce(300000 * this.entity.directionX, -500000);
        this.entity.stage.addEntity(hook);
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        this.ai.changeState(`stationary`);
        return true;
    }
}
