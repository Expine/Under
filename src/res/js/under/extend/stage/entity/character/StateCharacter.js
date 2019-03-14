/**
 * State character
 * - Object present on the stage that has coordinate and size
 * - Manages image
 * - It can be collided because it has material and collider
 * - It is not fixed and can be moved
 * - It can move by AI
 * - Manages AI by list
 * - Object that can be destroyed
 * - Object that can be damaged
 * - Implements damagable and animationable
 * - ### Entity that manages AI according to state and rendering by it
 * @extends {Character}
 * @classdesc State character that manages AI according to state and rendering by it
 */
class StateCharacter extends Character {
    /**
     * State character constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * State of character
         * @protected
         * @type {State}
         */
        this.state = null;
    }

    /**
     * Apply entity's AI
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    applyAI(dt) {
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
    render(ctx, shiftX = 0, shiftY = 0) {
        if (this.state !== null && this.state.canRendering) {
            this.state.render(ctx, shiftX, shiftY);
        } else {
            super.render(ctx, shiftX, shiftY);
        }
    }
}
