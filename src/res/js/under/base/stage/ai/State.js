/**
 * State of ai
 * Determine the operation by AI according to the state
 * @classdesc State of ai to determine the operation
 */
class State { // eslint-disable-line  no-unused-vars
    /**
     * State constructor
     * @constructor
     * @param {string} name State name
     */
    constructor(name) {
        /**
         * State name for getting state animation
         * @type {string}
         */
        this.name = name;

        /**
         * State coounter for animation
         * @type {number}
         */
        this.stateCount = 0;
    }

    /**
     * Initialize
     * @interface
     */
    init() {}

    /**
     * Set entity for targeting
     * @param {Entity} entity Entity for tageting
     */
    setEntity(entity) {
        /**
         * Entity for targeting
         * @type {Entity}
         */
        this.entity = entity;
    }

    /**
     * Set AI for operating
     * @param {StateAI} ai AI for operating
     */
    setAI(ai) {
        /**
         * AI for operating
         * @type {StateAI}
         */
        this.ai = ai;
    }

    /**
     * Apply AI and decide action
     * @interface
     * @param {number} dt - delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {}

    /**
     * Render entity by this state
     * @interface
     * @param {Context} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        let data = this.entity.getStateAnimation(this.name).animations;
        ctx.drawImage(data.imageID, data.srcX, data.srcY, data.srcW, data.srcH, this.entity.x + shiftX, this.entity.y + shiftY, this.entity.width, this.entity.height);
    }
}
