/**
 * Hook state AI
 * - Determines the behavior of an entity
 * - Determines by state
 * - Manages state by name
 * - ### Indicates hooking and released state
 * @extends {NamedStateAI}
 * @classdesc Hook state AI to indicate hooked and released state
 */
class HookStateAI extends NamedStateAI {
    /**
     * Hook State AI Constructor
     * @constructor
     */
    constructor() {
        super(`hooking`);

        this.namedStates[`hooking`] = new HookingState();
        this.namedStates[`released`] = new HookReleasedState();
    }
}
