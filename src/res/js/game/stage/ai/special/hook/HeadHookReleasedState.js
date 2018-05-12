/**
 * Head Hook released state
 * - Determines the operation by AI according to the state and renders based on state
 * - ### Hook condition after released
 * @extends {HookReleasedState}
 * @classdesc Head Hook released state after released
 */
class HeadHookReleasedState extends HookReleasedState { // eslint-disable-line  no-unused-vars
    /**
     * Head Hook released state
     * @constructor
     * @param {IHook} hook Hook for getting hook information
     * @param {RigidBody} body Original body of hook head
     */
    constructor(hook, body) {
        super(hook);

        /**
         * Original body of hook head
         * @protected
         * @type {RigidBody}
         */
        this.body = body;
    }

    /**
     * Initialize
     */
    init() {
        this.body.enable = true;
    }
}
