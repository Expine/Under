/**
 * Head Hook released state
 * - Determines the operation by AI according to the state and renders based on state
 * - ### Hook condition after released
 * @implements {HookReleasedState}
 * @classdesc Head Hook released state after released
 */
class HeadHookReleasedState extends HookReleasedState { // eslint-disable-line  no-unused-vars
    /**
     * Head Hook released state
     * @constructor
     * @param {IHook} hook Hook for getting hook information
     * @param {IJoint} joint Joint for jointing to collision object
     */
    constructor(hook, joint) {
        super(hook);

        /**
         * Joint for jointing to collision object
         * @protected
         * @type {IJoint}
         */
        this.joint = joint;
    }

    /**
     * Initialize
     * @interface
     */
    init() {
        this.joint.unjoint();
    }
}
