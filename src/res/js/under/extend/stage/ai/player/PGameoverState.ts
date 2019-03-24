import { BaseState } from "../state/BaseState";
import { Context } from "../../../../base/resources/image/Context";

/**
 * Player gameover state
 * - The state in which the player got over game
 * @extends {BaseState}
 * @classdesc Player gameover state in which the player got over game
 */
export class PGameoverState extends BaseState {
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
