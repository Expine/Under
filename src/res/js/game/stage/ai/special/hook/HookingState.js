/**
 * Hooking state
 * Hook condition before collision
 * @implements {State}
 * @classdesc Hooking state before collision
 */
class HookingState extends State { // eslint-disable-line  no-unused-vars
    /**
     * Hooking state
     * @constructor
     * @param {Entity} actor Actor who threw a hook
     */
    constructor(actor) {
        super();

        /**
         * Actor who threw a hook
         * @protected
         * @type {Entity}
         */
        this.actor = actor;
    }

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
        // enforce
        let dx = this.actor.x - this.entity.x;
        let dy = this.actor.y - this.entity.y;
        this.entity.body.enforce(dx * 500 / dt, dy * 500 / dt);
        // set direction
        let vx = Math.sign(this.entity.body.preVelocityX);
        let vy = Math.sign(this.entity.body.preVelocityY);
        this.entity.directionX = vx == 0 ? this.entity.directionX : vx;
        this.entity.directionY = vy == 0 ? this.entity.directionY : vy;
        // check collisions
        for (let it of this.entity.collider.collisions) {
            let dot = it.nx * this.entity.directionX + it.ny * this.entity.directionY;
            if ((it.e1 === this.entity && dot > 0) || (it.e2 === this.entity && dot < 0)) {
                this.entity.body.setEnable(false);
                this.ai.changeState(`hooked`);
            }
        }
        return true;
    }
}
