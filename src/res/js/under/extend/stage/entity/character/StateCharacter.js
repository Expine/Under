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
 * - Implements damagable and animationable
 * - ### Entity that manages AI according to state and rendering by it
 * @implements {Character}
 * @classdesc State character that manages AI according to state and rendering by it
 */
class StateCharacter extends Character { // eslint-disable-line  no-unused-vars
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
     * Add AI system
     * @override
     * @param {AI} ai AI to control this
     * @param {number} [priority=-1] Priority of AI. If it is a positive number count from the front, if it is a negative number count from the back
     */
    addAI(ai, priority = -1) {
        super.addAI(ai, priority);
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
        if (this.state != null && this.stage.canRendering) {
            this.state.render(ctx, shiftX, shiftY);
        } else {
            super.render(ctx, shiftX, shiftY);
        }
    }
}
