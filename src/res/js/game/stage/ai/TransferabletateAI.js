/**
 * Transferable state AI
 * - Determines the behavior of an entity
 * - Determines by state
 * - Manages state by name
 * - ### Basic information can be transferred to another state AI
 * @interface
 * @extends {NamedStateAI}
 * @classdesc Transferable state AI to transfer information to another state AI
 */
class TransferableStateAI extends NamedStateAI { // eslint-disable-line  no-unused-vars
    /**
     * Transfer information to another state AI
     * @param {TransferableStateAI} state Where to give information
     */
    transfer(state) {
        for (const name in this.namedStates) {
            if (this.namedStates.hasOwnProperty(name)) {
                const other = state.namedStates[name];
                if (other instanceof TransferableState) {
                    // transfer state
                    this.namedStates[name].transfer(other);
                }
            }
        }
        // set same state
        state.stateName = this.stateName;
    }
}
