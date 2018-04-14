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
     * @param {IHook} hook Hook object to get previous entity
     * @param {Entity} actor Hook actor
     */
    constructor(hook, actor) {
        super(`hooking`);

        this.namedStates[`hooking`] = new HookingState(hook);
        this.namedStates[`released`] = new HookReleasedState(hook);
    }
}
