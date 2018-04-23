/**
 * Stage event
 * - Updates and renders event
 * - Controls the stage
 * - ### Renders the image
 * @classdesc Stage event to control the stage
 */
class ImageEvent extends StageEvent { // eslint-disable-line  no-unused-vars
    /**
     * Stage event constructor
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
     * Update event
     * @interface
     * @param {number} dt Delta time
     */
    update(dt) {
        if (Input.it.isPress(Input.key.yes())) {
            this.op.stopUpdate(this);
            this.op.stopRender(this);
        }
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
