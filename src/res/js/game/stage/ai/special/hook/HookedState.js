/**
 * Hooked state
 * - Determines the operation by AI according to the state and renders based on state
 * - ### Hook condision after hooked
 * @extends {State}
 * @classdesc Hooked state after hooked
 */
class HookedState extends State { // eslint-disable-line  no-unused-vars
    /**
     * Hooked state
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
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        return true;
    }
}
