/**
 * AI listed object
 * - Object present on the stage that has coordinate and size
 * - Has image ID
 * - It can be collided because it has material and collider
 * - It is not fixed and can be moved
 * - It can move by AI
 * - ### Manages AI by list
 * @implements {AutonomyEntitiy}
 * @classdesc AI listed object to manage AI by list
 */
class AIListedObject extends AutonomyEntitiy { // eslint-disable-line  no-unused-vars
    /**
     * AI listed object constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * AI list to control this
         * @protected
         * @type {Array<AI>}
         */
        this.ai = [];
    }

    /**
     * Add AI system
     * @override
     * @param {AI} ai AI to control this
     * @param {number} [priority=-1] Priority of AI. If it is a positive number count from the front, if it is a negative number count from the back
     */
    addAI(ai, priority = -1) {
        let index = priority < 0 ? this.ai.length + priority + 1 : priority;
        this.ai.splice(index, 0, ai);
        // initialize
        super.addAI(ai, priority);
    }

    /**
     * Remove AI system
     * @override
     * @param {AI} ai AI to control this
     */
    removeAI(ai) {
        let index = this.ai.indexOf(ai);
        if (index != -1) {
            this.ai.splice(index, 1);
        }
    }

    /**
     * Update entity's AI
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateAI(dt) {
        for (let it of this.ai) {
            it.update(dt);
        }
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
        if (this.imageID != -1) {
            ctx.drawImage(this.imageID, this.x + shiftX, this.y + shiftY, this.width, this.height);
        }
    }
}
