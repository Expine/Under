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
     * @param {IHook} hook Hook for getting hook information
     */
    constructor(hook) {
        super(hook);

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
        let vx = Math.sign(this.entity.body.velocityX);
        let vy = Math.sign(this.entity.body.velocityY);
        this.entity.directionX = vx == 0 ? this.entity.directionX : vx;
        this.entity.directionY = vy == 0 ? this.entity.directionY : vy;
        // auto release
        if (vy > 0 && this.descentCount++ == 5) {
            let hooks = this.entity.stage.getEntities().filter((it) => BaseUtil.implementsOf(it, IHook));
            if (hooks.length >= 1) {
                for (let it of hooks) {
                    if (it.getActor() === this.hook.getActor()) {
                        it.release();
                    }
                }
            }
            return true;
        }
        // check collisions
        for (let it of this.entity.collider.collisions) {
            let dot = it.nx * this.entity.directionX + it.ny * this.entity.directionY;
            if ((it.colliding === this.entity && dot > 0) || (it.collided === this.entity && dot < 0)) {
                let you = Util.getCollidedEntity(this.entity, it);
                if (!you.collider.isResponse(this.entity.collider) || !this.entity.collider.isResponse(you.collider)) {
                    continue;
                }
                if (BaseUtil.implementsOf(you, IHook) && you.getActor() === this.hook.getActor()) {
                    continue;
                }
                // move
                let count = 0;
                let dx = Math.sign(this.entity.body.velocityX);
                let dy = Math.sign(this.entity.body.velocityY);
                // TODO: Should be jointed
                while (this.entity.stage.getPhysicalWorld().getCollisionData(this.entity.collider).length == 0 && ++count < 8) {
                    let reached = false;
                    for (let data of this.entity.stage.getPhysicalWorld().getCollisionData(this.entity.collider)) {
                        let you = Util.getCollidedEntity(this.entity, data);
                        if (you.collider.isResponse(this.entity.collider) && this.entity.collider.isResponse(you.collider)) {
                            reached = true;
                            break;
                        }
                    }
                    if (reached) {
                        break;
                    }
                    this.entity.deltaMove(dx, dy);
                }
                // hook
                this.entity.hooked();
                this.ai.changeState(`hooked`);
                break;
            }
        }
        return true;
    }
}
