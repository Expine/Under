/**
 * State character
 * - Object present on the stage that has coordinate and size
 * - Has image ID
 * - It can be collided because it has material and collider
 * - It is not fixed and can be moved
 * - It can move by AI
 * - Manages AI by list
 * - Object that can be destroyed
 * - Object that can be damaged
 * - Enable to set animation
 * - Implements damagable and animationable
 * - ### Entity that manages AI according to state and rendering by it
 * @implements {Character}
 * @classdesc State character that manages AI according to state and rendering by it
 */
class StateCharacter extends Character { // eslint-disable-line  no-unused-vars
    /**
     * State character constructor
     * @constructor
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} width Entity width
     * @param {number} height Entity height
     * @param {number} hp Hit point
     * @param {number} imageID Image ID for rendering (if has not, -1)
     */
    constructor(x, y, width, height, hp, imageID = -1) {
        super(x, y, width, height, hp, imageID);

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
        for (let it of this.ai) {
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
        if (this.state != null) {
            this.state.render(ctx, shiftX, shiftY);
        } else {
            super.render(ctx, shiftX, shiftY);
        }
    }
}
