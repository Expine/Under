/**
 * Hook released state
 * Hook condition before collision
 * @implements {State}
 * @classdesc Hook released state before collision
 */
class HookReleasedState extends State { // eslint-disable-line  no-unused-vars
    /**
     * Hook released state
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
     * Initialize state
     * @override
     */
    init() {
        if (this.entity.body !== undefined) {
            this.entity.body.setEnable(true);
            this.entity.body.reset();
        }
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        // enforce
        let dx = this.actor.x + this.actor.width / 2 - this.entity.x - this.entity.width / 2;
        let dy = this.actor.y + this.actor.height / 2 - this.entity.y - this.entity.height / 2;
        dx += Math.sign(dx) * 100;
        dy += Math.sign(dx) * 100;
        if (this.entity.body !== undefined) {
            this.entity.body.enforce(dx * 3000 / dt, dy * 3000 / dt);
            // set direction
            let vx = Math.sign(this.entity.body.velocityX);
            let vy = Math.sign(this.entity.body.velocityY);
            this.entity.directionX = vx == 0 ? this.entity.directionX : vx;
            this.entity.directionY = vy == 0 ? this.entity.directionY : vy;
        }
    }
}
