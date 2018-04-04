/**
 * Hooked state
 * Hook condition before collision
 * @implements {State}
 * @classdesc Hooked state before collision
 */
class HookedState extends State { // eslint-disable-line  no-unused-vars
    /**
     * Hooked state
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
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        // enforce actor
        let dx = this.actor.x - this.entity.x;
        let dy = this.actor.y - this.entity.y;
        let d = Math.sqrt(dx * dx + dy * dy);
        let l = d - this.entity.getLength() + 50;
        if (l > 0) {
            this.actor.body.enforce(l * -dx * 8000 / d / dt, l * -dy * 8000 / d / dt);
        }
        return true;
    }
}
