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
     * @param {Hookable} hook Hook object to get previous entity
     */
    constructor(hook) {
        super();

        /**
         * Hook object to get previous entity
         * @protected
         * @type {Hookable}
         */
        this.hook = hook;
    }

    // TODO: Should store other value
    /**
     * Set entity for targeting
     * @override
     * @param {AutonomyEntitiy} entity Entity for tageting
     */
    setEntity(entity) {
        if (BaseUtil.implementsOf(entity, Hookable)) {
            super.setEntity(entity);
        }
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        let pre = this.hook.getPrevious();
        if (pre !== null) {
            // enforce hook
            let dx = this.entity.getHookX() - pre.getHookX();
            let dy = this.entity.getHookY() - pre.getHookY();
            let d = Math.sqrt(dx * dx + dy * dy);
            let l = d - this.hook.getLength();
            if (l > 0) {
                this.entity.body.enforce(-l * dx * 10000 / d / dt, -l * dy * 10000 / d / dt);
                pre.tension(l * dx / d, l * dy / d, dt);
            }
        } else {
            // enforce actor
        }
        return true;
    }
}
