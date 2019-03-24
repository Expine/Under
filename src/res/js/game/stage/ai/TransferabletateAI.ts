import { NamedStateAI } from "../../../under/extend/stage/ai/NamedStateAI";
import { TransferableState } from "./state/TransferableState";

/**
 * Transferable state AI
 * - Basic information can be transferred to another state AI
 * @interface
 * @extends {NamedStateAI}
 * @classdesc Transferable state AI to transfer information to another state AI
 */
export abstract class TransferableStateAI extends NamedStateAI {
    /**
     * Transfer information to another state AI
     * @param {TransferableStateAI} state Where to give information
     */
    transfer(state: TransferableStateAI) {
        for (const name in this.namedStates) {
            const namedState = this.namedStates[name];
            if (namedState instanceof TransferableState && this.namedStates.hasOwnProperty(name)) {
                const other = state.namedStates[name];
                if (other instanceof TransferableState) {
                    // transfer state
                    namedState.transfer(other);
                }
            }
        }
        // set same state
        state.stateName = this.stateName;
    }
}
