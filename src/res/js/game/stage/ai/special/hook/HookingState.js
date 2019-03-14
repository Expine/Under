/**
 * Hooking state
 * - Determines the operation by AI according to the state and renders based on state
 * - ### Hook condition before collision to create post hook
 * @extends {State}
 * @classdesc Hooking state before collision to create post hook
 */
class HookingState extends State {
    /**
     * Hooking state
     * @constructor
     */
    constructor() {
        super();

        /**
         * Hook for getting hook information
         * @protected
         * @type {IHook}
         */
        this.hook = null;
    }

    /**
     * Initialize
     * @override
     */
    init() {
        if (BaseUtil.implementsOf(this.entity, IHook)) {
            this.hook = this.entity;
        }
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        if (this.hook !== null) {
            this.hook.createPost();
        }
        return true;
    }
}
