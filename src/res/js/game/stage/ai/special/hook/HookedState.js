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
        this.actor.body.enforce(-dx * 8000 / dt, -dy * 8000 / dt);
        return true;
    }
}
