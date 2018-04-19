/**
 * Hook state AI
 * - Determines the behavior of an entity
 * - Determines by state
 * - Manages state by name
 * - ### Indicates hooking and released state
 * @extends {NamedStateAI}
 * @classdesc Hook state AI to indicate hooked and released state
 */
class HookStateAI extends NamedStateAI { // eslint-disable-line  no-unused-vars
    /**
     * Hook State AI Constructor
     * @constructor
     * @param {IHook} hook Hook for getting hook information
     */
    constructor(hook) {
        super(`hooking`);

        this.namedStates[`hooking`] = new HookingState(hook);
        this.namedStates[`released`] = new HookReleasedState(hook);
    }
}
