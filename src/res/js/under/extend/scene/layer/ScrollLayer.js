/**
 * Scroll layer
 * - Performs drawing processing collectively
 * - ### It can scroll inner elements
 * @extends {Layer}
 * @classdesc Scroll layer that can scroll inner elements
 */
class ScrollLayer extends Layer {
    /**
     * Scroll layer constructor
     * @constructor
     * @param {ClipLayer} delegate Delegte cliping layer
     */
    constructor(delegate) {
        super();
        /**
         * Delegate cliping layer
         * @protected
         * @type {ClipLayer}
         */
        this.delegate = delegate;

        /**
         * Scrolling x position
         * @protected
         * @type {number}
         */
        this.scrollX = 0;
        /**
         * Scrolling y position
         * @protected
         * @type {number}
         */
        this.scrollY = 0;
    }

    /**
     * Scroll relatively
     * @param {number} x Scroll relative x
     * @param {number} y Scroll relative y
     */
    scroll(x, y) {
        this.scrollX += x;
        this.scrollY += y;
    }

    /**
     * Initialize scene
     * @override
     */
    init() {
        this.delegate.init();
    }

    /**
     * Update layer
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        const width = this.delegate.width;
        const height = this.delegate.height;
        if (this.width < width) {
            if (this.scrollX < 0) {
                this.scrollX = 0;
            } else if (this.scrollX > width - this.width) {
                this.scrollX = width - this.width;
            }
        } else {
            this.scrollX = 0;
        }
        if (this.height < height) {
            if (this.scrollY < 0) {
                this.scrollY = 0;
            } else if (this.scrollY > height - this.height) {
                this.scrollY = height - this.height;
            }
        } else {
            this.scrollY = 0;
        }
        // update
        this.delegate.setPosition(this.x - this.scrollX, this.y - this.scrollY, this.z);
        this.delegate.clip(this.x, this.y, this.width, this.height);
        this.delegate.update(dt);
    }

    /**
     * Render layer
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        this.delegate.render(ctx);
    }
}
