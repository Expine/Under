/**
 * Hook released state
 * - Determines the operation by AI according to the state and renders based on state
 * - ### Hook condition after released
 * @implements {State}
 * @classdesc Hook released state after released
 */
class HookReleasedState extends State { // eslint-disable-line  no-unused-vars
    /**
     * Hook released state
     * @constructor
     * @param {IHook} hook Hook for getting hook information
     */
    constructor(hook) {
        super();

        /**
         * Hook for getting hook information
         * @protected
         * @type {IHook}
         */
        this.hook = hook;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        // check collisions
        for (let it of this.entity.collider.collisions) {
            let you = Util.getCollidedEntity(this.entity, it);
            if (you === this.hook.getActor()) {
                this.hook.tryRemove();
                break;
            }
        }
    }
}
