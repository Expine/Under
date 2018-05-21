/**
 * Drag scroll layer
 * - Performs drawing processing collectively
 * - It can scroll inner elements
 * - ### It can scroll by mouse dragging
 * @extends {ScrollLayer}
 * @classdesc Drag scroll layer that can scroll mouse dragging
 */
class DragScrollLayer extends ScrollLayer { // eslint-disable-line  no-unused-vars
    /**
     * Drag scroll layer constructor
     * @constructor
     * @param {ClipLayer} delegate Delegte cliping layer
     */
    constructor(delegate) {
        super(delegate);

        /**
         * Currently mouse x position
         * @protected
         * @type {number}
         */
        this.oldMouseX = 0;
        /**
         * Currently mouse y position
         * @protected
         * @type {number}
         */
        this.oldMouseY = 0;

        /**
         * Whether scrolling or not
         * @protected
         * @type {boolean}
         */
        this.scrolling = false;
    }

    /**
     * Update layer
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        const x = Input.mouse.getMouseX();
        const y = Input.mouse.getMouseY();
        if (this.x <= x && x < this.x + this.width && this.y <= y && y < this.y + this.height && Input.mouse.isPress(Input.mouse.mRight())) {
            this.scrolling = true;
            this.oldMouseX = x;
            this.oldMouseY = y;
        }
        if (!Input.mouse.isPressed(Input.mouse.mRight())) {
            this.scrolling = false;
        }
        if (this.scrolling) {
            // block
            Input.mouse.blockInput(Input.mouse.mRight());
            this.scroll(x - this.oldMouseX, y - this.oldMouseY);
            this.oldMouseX = x;
            this.oldMouseY = y;
        }
        // update scroll
        super.update(dt);
    }
}
