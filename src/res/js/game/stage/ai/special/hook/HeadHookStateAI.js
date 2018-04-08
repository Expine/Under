/**
 * Head Hook state AI
 * AI with state
 * @extends {NamedStateAI}
 * @classdesc AI with state for determining action
 */
class HeadHookStateAI extends NamedStateAI { // eslint-disable-line  no-unused-vars
    /**
     * Head hook State AI Constructor
     * @constructor
     * @param {Hookable} hook Hook object to get previous entity
     * @param {Entity} actor Hook actor
     */
    constructor(hook, actor) {
        super(`hooking`);

        this.namedStates[`hooking`] = new HeadHookingState(hook);
        this.namedStates[`hooked`] = new HookingState(hook);
        this.namedStates[`released`] = new HeadHookReleasedState(actor);
    }
}
