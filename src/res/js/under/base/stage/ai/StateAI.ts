import { AI } from "./AI";
import { State } from "./state/State";

/**
 * Type of State ID
 */
export type StateID = string;

/**
 * State AI
 * - Determines by state
 * @abstract
 * @extends {AI}
 * @classdesc State AI to determine by state
 */
export abstract class StateAI extends AI {
    /**
     * Get state
     * @abstract
     * @return {State} State of AI
     */
    abstract getState(): State | null;

    /**
     * Get currently state ID
     * @abstract
     * @return {StateID} Currently state ID
     */
    abstract getStateID(): StateID;

    /**
     * Set state by ID
     * @abstract
     * @param {State} state State
     * @param {StateID} id State ID
     */
    abstract setState(state: State, id: StateID): void;

    /**
     * Change state
     * @param {StateID} id ID of state to change
     * @return {boolean} Whether change state or not
     */
    changeState(_id: StateID): boolean {
        const state = this.getState();
        if (state !== null) {
            state.setAI(this);
            if (this.entity !== null) {
                state.setEntity(this.entity);
            }
            state.init();
        }
        return true;
    }

    /**
     * Update state
     * @override
     * @param {number} dt Delta time
     */
    update(dt: number) {
        const state = this.getState();
        if (state !== null) {
            state.update(dt);
        }
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt: number): boolean {
        const state = this.getState();
        return state !== null && state.apply(dt);
    }
}
