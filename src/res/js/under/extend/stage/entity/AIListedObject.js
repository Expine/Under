/**
 * AI Listed object
 * Manages AI by list
 * @implements {AutonomyObject}
 * @classdesc AI Listed object to manager AI by list
 */
class AIListedObject extends AutonomyObject { // eslint-disable-line  no-unused-vars
    /**
     * Entity constructor
     * @constructor
     * @param {number} x x position
     * @param {number} y y position
     * @param {number} width object width
     * @param {number} height object height
     * @param {number} imageID image ID for rendering (if has not, -1)
     */
    constructor(x, y, width, height, imageID = -1) {
        super(x, y, width, height, imageID);

        /**
         * AI list to control this
         * @type {Array<AI>}
         */
        this.ai_ = [];
    }

    /**
     * Add AI system
     * @override
     * @param {AI} ai AI to control this
     * @param {number} priority priority of AI. If it is a positive number count from the front, if it is a negative number count from the back
     */
    addAI(ai, priority = -1) {
        let index = priority < 0 ? this.ai_.length + priority + 1 : priority;
        let newer = [];
        for (var i = 0; i < this.ai_.length + 1; ++i) {
            if (i == index) {
                newer.push(ai);
            }
            if (i < this.ai_.length) {
                newer.push(this.ai_[i]);
            }
        }
        this.ai_ = newer;
    }

    /**
     * Update object
     * @override
     * @param {number} dt - delta time
     */
    update(dt) {
        for (let it of this.ai_) {
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
        ctx.drawImage(this.imageID, this.x + shiftX, this.y + shiftY, this.width, this.height);

        // For debug to render collider
        if (this.collider !== undefined) {
            this.collider.render(ctx, shiftX, shiftY);
        }
    }
}
