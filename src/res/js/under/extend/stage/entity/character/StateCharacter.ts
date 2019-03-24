import { Character } from "./Character";
import { State } from "../../../../base/stage/ai/state/State";
import { StateAI } from "../../../../base/stage/ai/StateAI";
import { Context } from "../../../../base/resources/image/Context";

/**
 * State character
 * - Entity that manages AI according to state and rendering by it
 * @extends {Character}
 * @classdesc State character that manages AI according to state and rendering by it
 */
export class StateCharacter extends Character {
    /**
     * State of character
     * @protected
     * @type {State}
     */
    protected state: State | null;

    /**
     * State character constructor
     * @constructor
     */
    constructor() {
        super();

        this.state = null;
    }

    /**
     * Apply entity's AI
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    applyAI(dt: number) {
        for (const it of this.ai) {
            if (it.apply(dt)) {
                this.state = it instanceof StateAI ? it.getState() : null;
                break;
            }
        }
    }

    /**
     * Render entity
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx: Context, shiftX: number = 0, shiftY: number = 0) {
        if (this.state !== null && this.state.canRendering) {
            this.state.render(ctx, shiftX, shiftY);
        } else {
            super.render(ctx, shiftX, shiftY);
        }
    }
}
