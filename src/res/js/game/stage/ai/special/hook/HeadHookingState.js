/**
 * Head hooking state
 * - Determines the operation by AI according to the state and renders based on state
 * - Hook condition before collision to create post hook
 * - ### Transition to hooked state
 * @extends {HookingState}
 * @classdesc Head Hooking state for transition to hooked sate
 */
class HeadHookingState extends HookingState { // eslint-disable-line  no-unused-vars
    /**
     * Head hooking state constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Count during descent
         * @protected
         * @type {number}
         */
        this.descentCount = 0;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        super.apply(dt);
        // set direction
        const vx = Math.sign(this.entity.body.velocityX);
        const vy = Math.sign(this.entity.body.velocityY);
        this.entity.setDirection(vx === 0 ? undefined : vx, vy === 0 ? undefined : vy);
        // check hook
        if (this.hook === null) {
            return true;
        }
        // auto release
        if (vy > 0 && this.descentCount++ >= 5) {
            const hooks = this.entity.stage.getEntitiesByInterface(IHook);
            if (hooks.length >= 1) {
                for (const it of hooks) {
                    if (it.getActor() === this.hook.getActor()) {
                        it.release();
                    }
                }
            }
            return true;
        }
        // check collisions
        for (const it of this.entity.collider.collisions) {
            const dot = it.nx * this.entity.directionX + it.ny * this.entity.directionY;
            if ((it.colliding === this.entity && dot > 0) || (it.collided === this.entity && dot < 0)) {
                const you = Util.getCollidedEntity(this.entity, it);
                if (!you.collider.isResponse(this.entity.collider) || !this.entity.collider.isResponse(you.collider)) {
                    continue;
                }
                if (BaseUtil.implementsOf(you, IHook) && you.getActor() === this.hook.getActor()) {
                    continue;
                }
                // hook
                this.hook.hooked();
                this.ai.changeState(`hooked`);
                break;
            }
        }
        return true;
    }
}
