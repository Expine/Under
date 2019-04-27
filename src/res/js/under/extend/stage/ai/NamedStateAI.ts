import { StateAI, StateID } from "../../../base/stage/ai/StateAI";
import { State } from "../../../base/stage/ai/state/State";

/**
 * Named state AI
 * - Manages state by name
 * @extends {StateAI}
 * @classdesc Named state AI to manage state by name
 */
export class NamedStateAI extends StateAI {
    /**
     * AI State
     * @protected
     * @type {State}
     */
    protected state: State | null;

    /**
     * AI State name
     * @protected
     * @type {string}
     */
    protected stateName: string;

    /**
     * List of named states
     * Associates a name with a state
     * @protected
     * @type {Object<string, State>}
     */
    protected namedStates: { [s: string]: State; }

    /**
     * Named State AI Constructor
     * @param {string} id Initial state name
     */
    constructor(id: string) {
        super();

        this.state = null;
        this.stateName = id;
        this.namedStates = {};
    }

    /**
     * Initialize AI
     * @override
     */
    init() {
        // save
        const state = this.stateName;
        this.stateName = '';
        this.changeState(state);
    }

    /**
     * Get state
     * @override
     * @return {State} state of ai
     */
    getState(): State | null {
        return this.state;
    }

    /**
     * Get currently state ID
     * @abstract
     * @return {StateID} Currently state ID
     */
    getStateID(): StateID {
        return this.stateName;
    }

    /**
     * Set state by name
     * @override
     * @param {State} state State
     * @param {StateID} id State ID
     */
    setState(state: State, id: StateID) {
        this.namedStates[id] = state;
    }

    /**
     * Change state
     * @override
     * @param {StateID} id ID of state to change
     * @return {boolean} Whether change state or not
     */
    changeState(id: StateID): boolean {
        // Do not process if it is in the same state
        if (id === this.stateName) {
            return false;
        }
        if (this.namedStates[id] === undefined) {
            return false;
        }
        this.stateName = id;
        this.state = this.namedStates[id];
        // initialize
        super.changeState(id);
        return true;
    }
}
