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
     * @param {number} x Image x position
     * @param {number} y Image y position
     * @param {number} imageID Image ID for rendering
     */
    constructor(x, y, imageID) {
        super();

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
     * Render event
     * @interface
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        super.render(ctx);
        ctx.drawImage(this.imageID, this.x, this.y);
    }
}
