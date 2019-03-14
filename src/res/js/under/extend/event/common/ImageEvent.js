/**
 * Image event
 * - Updates and renders event
 * - Identified by name
 * - ### Renders the image
 * @extends {NamedEvent}
 * @classdesc Image event to render the image
 */
class ImageEvent extends NamedEvent {
    /**
     * Image event constructor
     * @constructor
     * @param {string} name Image unique name
     * @param {number} x Image x position
     * @param {number} y Image y position
     * @param {GameImage} image Event image
     */
    constructor(name, x, y, image) {
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
         * Image for rendering
         * @protected
         * @type {GameImage}
         */
        this.image = image;
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        this.op.next();
        this.image.init();
    }

    /**
     * Update event
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether update is endped or not
     */
    update(dt) {
        this.image.update();
        return false;
    }

    /**
     * Render event
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        super.render(ctx);
        this.image.render(ctx, this.x, this.y);
    }
}
