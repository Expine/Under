/**
 * Single AI Object
 * Manages AI by list
 * @implements {BreakableObject}
 * @classdesc AI Listed object to manager AI by list
 */
class SingleAIObject extends BreakableObject { // eslint-disable-line  no-unused-vars
    /**
     * Single AI object constructor
     * @constructor
     * @param {number} x x position
     * @param {number} y y position
     * @param {number} width object width
     * @param {number} height object height
     * @param {number} [imageID=-1] image ID for rendering (if has not, -1)
     */
    constructor(x, y, width, height, imageID = -1) {
        super(x, y, width, height, imageID);

        /**
         * AI list to control this
         * @protected
         * @type {Array<AI>}
         */
        this.ai = [];

        /**
         * Hit point
         * @type {number}
         */
        this.hp = 0;
    }

    /**
     * Add AI system
     * @override
     * @param {AI} ai AI to control this
     * @param {number} priority priority of AI. If it is a positive number count from the front, if it is a negative number count from the back
     */
    addAI(ai, priority = -1) {
        let index = priority < 0 ? this.ai.length + priority + 1 : priority;
        let newer = [];
        for (var i = 0; i < this.ai.length + 1; ++i) {
            if (i == index) {
                newer.push(ai);
            }
            if (i < this.ai.length) {
                newer.push(this.ai[i]);
            }
        }
        this.ai = newer;
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
     * Get hit point
     * @override
     * @return {number} Hit point
     */
    getHP() {
        return this.hp;
    }

    /**
     * Damage object
     * @override
     * @param {number} damage Amount of damage
     */
    damage(damage) {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.destroy();
        }
    }

    /**
     * Destroy object
     * @override
     */
    destroy() {
        this.stage.removeEntity(this);
    }


    /**
     * Update object
     * @override
     * @param {number} dt - delta time
     */
    update(dt) {
        for (let it of this.ai) {
            if (it.apply(dt)) {
                break;
            }
        }
    }

    /**
     * Render entity
     * @override
     * @param {Context} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        if (this.imageID != -1) {
            ctx.drawImage(this.imageID, this.x + shiftX, this.y + shiftY, this.width, this.height);
        }

        // For debug to render collider
        if (this.collider !== undefined) {
            this.collider.render(ctx, shiftX, shiftY);
        }
    }
}
