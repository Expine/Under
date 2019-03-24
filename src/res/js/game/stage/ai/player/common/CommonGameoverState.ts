import { UnderPlayerState } from "../UnderPlayerState";
import { Context } from "../../../../../under/base/resources/image/Context";
import { TransferableState } from "../../state/TransferableState";

/**
 * Common gameover state
 * - The state in which the player got over game
 * @extends {UnderPlayerState}
 * @classdesc Common gameover state in which the player got over game
 */
export class CommonGameoverState extends UnderPlayerState {
    /**
     * Initialize state
     * @override
     */
    init() {
        super.init();
        if (this.entity !== null && this.entity.collider !== null) {
            this.entity.collider.fixBound(0, this.entity.height / 2, this.entity.width, this.entity.height);
        }
    }

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
