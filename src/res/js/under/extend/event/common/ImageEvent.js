/**
 * Image event
 * - Updates and renders event
 * - Identified by name
 * - ### Renders the image
 * @extends {NamedEvent}
 * @classdesc Image event to render the image
 */
class ImageEvent extends NamedEvent { // eslint-disable-line  no-unused-vars
    /**
     * Image event constructor
     * @constructor
     * @param {string} name Image unique name
     * @param {number} imageID Image ID for rendering
     * @param {number} x Image x position
     * @param {number} y Image y position
     * @param {number} width Image width
     * @param {number} height Image height
     */
    constructor(name, imageID, x, y, width, height) {
        super(name);

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

        /**
         * Image width
         * @protected
         * @type {number}
         */
        this.width = width;
        /**
         * Image height
         * @protected
         * @type {number}
         */
        this.height = height;
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        super.init();
        this.op.next();
    }

    /**
     * Update event
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether update is endped or not
     */
    update(dt) {
        return false;
    }

    /**
     * Render event
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        super.render(ctx);
        ctx.drawImage(this.imageID, this.x, this.y, this.width, this.height);
    }
}
