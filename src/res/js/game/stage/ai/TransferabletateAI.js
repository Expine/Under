/**
 * Transferable state AI
 * Basic information can be transferred to another state AI
 * @implements {NamedStateAI}
 * @classdesc Transferable state AI to transfer information to another state AI
 */
class TransferableStateAI extends NamedStateAI { // eslint-disable-line  no-unused-vars
    /**
     * Transfer information to another state AI
     * @param {TransferableStateAI} state Where to give information
     */
    transfer(state) {
        for (let name in this.namedStates) {
            if (this.namedStates.hasOwnProperty(name)) {
                let other = state.namedStates[name];
                if (other === undefined) {
                    // create to store animation
                    state.namedStates[name] = new NormalNoneState();
                }
                if (other instanceof TransferableState) {
                    // transfer state
                    this.namedStates[name].transfer(other);
                }
            }
        }
        // set same state
        state.changeState(this.stateName_);
    }
}
