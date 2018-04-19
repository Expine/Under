/**
 * Head Hook state AI
 * - Determines the behavior of an entity
 * - Determines by state
 * - Manages state by name
 * - Indicates hooking and released state
 * - ### Also indicates hooked state
 * @extends {HookStateAI}
 * @classdesc AI with state for determining action
 */
class HeadHookStateAI extends HookStateAI { // eslint-disable-line  no-unused-vars
    /**
     * Head hook State AI Constructor
     * @constructor
     * @param {IHook} hook Hook for getting hook information
     * @param {IString} string String for getting string information
     * @param {IJoint} joint Joint for jointing to collision object
     */
    constructor(hook, string, joint) {
        super(hook);

        this.namedStates[`hooking`] = new HeadHookingState(hook, string, joint);
        this.namedStates[`released`] = new HeadHookReleasedState(hook, joint);
    }
}
