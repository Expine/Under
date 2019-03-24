import { BaseState } from "../../../../under/extend/stage/ai/state/BaseState";

/**
 * Transferable state
 * - Basic information can be transferred to another state
 * @interface
 * @extends {BaseState}
 * @classdesc Transferable state to transfer information to another state
 */
export abstract class TransferableState extends BaseState {
    /**
     * Transfer information to another state
     * @abstract
     * @param {TransferableState} state Where to give information
     */
    abstract transfer(state: TransferableState): void;
}
