import { UnderPlayerState } from "../UnderPlayerState";
import { Util } from "../../../../../under/extend/util/Util";
import { Context } from "../../../../../under/base/resources/image/Context";
import { TransferableState } from "../../state/TransferableState";

/**
 * Wild rolling state
 * - Stops rolling after landing
 * @extends {UnderPlayerState}
 * @classdesc Wild rolling state to stop rolling after landing
 */
export class WildRollingState extends UnderPlayerState {
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
        // change state
        if (this.entity !== null && this.entity.body !== null && Util.onGround(this.entity)) {
            this.entity.body.setNextAddVelocity(-this.entity.body.velocityX, 0);
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
