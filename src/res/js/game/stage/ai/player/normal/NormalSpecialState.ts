import { UnderPlayerState } from "../UnderPlayerState";
import { Input } from "../../../../../under/base/input/Input";
import { Context } from "../../../../../under/base/resources/image/Context";
import { TransferableState } from "../../state/TransferableState";

/**
 * Normal special state
 * - Does special action
 * @extends {UnderPlayerState}
 * @classdesc Normal special state to do special action
 */
export class NormalSpecialState extends UnderPlayerState {
    /**
     * Update state
     * @override
     * @param {number} dt Delta time
     */
    update(_dt: number) { }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(_dt: number): boolean {
        if (!Input.key.isPressed(Input.key.sub())) {
            // change state
            this.transitionUsualState();
        }
        return true;
    }

    /**
     * Render entity by this state
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    render(_ctx: Context, _shiftX: number, _shiftY: number) { }

    /**
     * Transfer information to another state
     * @override
     * @param {TransferableState} state Where to give information
     */
    transfer(_state: TransferableState) { }
}
