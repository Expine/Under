/**
 * Image event
 * - Updates and renders event
 * - ### Renders the image
 * @classdesc Image event to render the image
 */
class ImageEvent extends GameEvent { // eslint-disable-line  no-unused-vars
    /**
     * Image event constructor
     * @constructor
     * @param {string} name Image unique name
     * @param {number} x Image x position
     * @param {number} y Image y position
     * @param {number} imageID Image ID for rendering
     */
    constructor(name, x, y, imageID) {
        super();

        /**
         * Image unique name
         * @protected
         * @type {string}
         */
        this.name = name;

        /**
         * Image x position
         * @protected
         * @type {number}
         */
        this.x = x;
        /**
         * Image y position
         * @protected
         * @type {number}
         */
        this.y = y;
        /**
         * Image ID for rendering
         * @protected
         * @type {number}
         */
        this.imageID = imageID;
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        super.init();
        this.op.stopUpdate(this);
        this.op.next();
    }

    /**
     * Get event's unique name
     * @return {string} Unique name of event (return null if it is unnecessary)
     */
    getName() {
        return this.name;
    }

    /**
     * Render event
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        super.render(ctx);
        ctx.drawImage(this.imageID, this.x, this.y);
    }
}
