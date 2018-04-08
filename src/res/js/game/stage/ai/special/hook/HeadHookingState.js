/**
 * Head hooking state
 * Hook condition before collision
 * @implements {HookingState}
 * @classdesc Hooking state before collision
 */
class HeadHookingState extends HookingState { // eslint-disable-line  no-unused-vars
    /**
     * Initialize
     * @override
     */
    init() {
        this.entity.directionX = Math.sign(this.entity.body.preVelocityX) == 0 ? 1 : Math.sign(this.entity.body.preVelocityX);
        this.entity.directionY = Math.sign(this.entity.body.preVelocityY) == 0 ? -1 : Math.sign(this.entity.body.preVelocityY);
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        super.apply(dt);
        // set direction
        let vx = Math.sign(this.entity.body.preVelocityX);
        let vy = Math.sign(this.entity.body.preVelocityY);
        this.entity.directionX = vx == 0 ? this.entity.directionX : vx;
        this.entity.directionY = vy == 0 ? this.entity.directionY : vy;
        // check collisions
        for (let it of this.entity.collider.collisions) {
            let dot = it.nx * this.entity.directionX + it.ny * this.entity.directionY;
            if ((it.e1 === this.entity && dot > 0) || (it.e2 === this.entity && dot < 0)) {
                let you = Util.getCollidedEntity(this.entity, it);
                if (BaseUtil.implementsOf(you, Hookable)) {
                    if (you.getActor() === this.entity.getActor()) {
                        continue;
                    }
                }
                this.entity.hooked();
                this.entity.body.setEnable(false);
                this.ai.changeState(`hooked`);
            }
        }
        return true;
    }
}
