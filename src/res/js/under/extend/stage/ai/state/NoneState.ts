import { State } from "../../../../base/stage/ai/state/State";
import { Context } from "../../../../base/resources/image/Context";

/**
 * None state
 * - Does nothing
 * @extends {State}
 * @classdesc None state to do nothing
 */
export class NoneState extends State {
    /**
     * Initialize
     * @override
     */
    init() { }

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
}
