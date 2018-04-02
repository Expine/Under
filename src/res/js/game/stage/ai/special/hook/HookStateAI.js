/**
 * Hook state AI
 * AI with state
 * @extends {NamedStateAI}
 * @classdesc AI with state for determining action
 */
class HookStateAI extends NamedStateAI { // eslint-disable-line  no-unused-vars
    /**
     * Hook State AI Constructor
     * @constructor
     * @param {Entity} actor Actor who threw a hook
     */
    constructor(actor) {
        super(`hooking`);

        this.namedStates[`hooking`] = new HookingState(actor);
        this.namedStates[`hooked`] = new HookedState(actor);
        this.namedStates[`released`] = new HookReleasedState(actor);
    }
}
