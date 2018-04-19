/**
 * Hooking state
 * - Determines the operation by AI according to the state and renders based on state
 * - ### Hook condition before collision to create post hook
 * @implements {State}
 * @classdesc Hooking state before collision to create post hook
 */
class HookingState extends State { // eslint-disable-line  no-unused-vars
    /**
     * Hooking state
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
        this.hook.createPost();
        return true;
    }
}
