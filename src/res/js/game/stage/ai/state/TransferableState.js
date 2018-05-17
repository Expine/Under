/**
 * Transferable state
 * - Determines the operation by AI according to the state and renders based on state
 * - Enable to set animation
 * - Initialize state image
 * - ### Basic information can be transferred to another state
 * @interface
 * @extends {BaseState}
 * @classdesc Transferable state to transfer information to another state
 */
class TransferableState extends BaseState { // eslint-disable-line  no-unused-vars
    /**
     * Transfer information to another state
     * @param {TransferableState} state Where to give information
     */
    transfer(state) {}
}
