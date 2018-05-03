/**
 * Text window event
 * - Updates and renders event
 * - Identified by name
 * - ### Render text and window
 * @extends {NamedEvent}
 * @classdesc Text window event to render text and window
 */
class TextWindowEvent extends NamedEvent { // eslint-disable-line  no-unused-vars
    /**
     * Text window event constructor
     * @constructor
     * @param {string} name Identified name
     * @param {number} x Text x position
     * @param {number} y Text y position
     * @param {string} sentence Talking sentence
     * @param {number} [size=-1] Font size
     */
    constructor(name, x, y, sentence, size = -1) {
        super(name);

        /**
         * Text x position
         * @protected
         * @type {number}
         */
        this.x = x;
        /**
         * Text y position
         * @protected
         * @type {number}
         */
        this.y = y;

        /**
         * Talking sentence
         * @protected
         * @type {string}
         */
        this.sentence = sentence;

        /**
         * Font size
         * @protected
         * @type {number}
         */
        this.size = size;

        /**
         * Show count
         * @@protected
         * @type {number}
         */
        this.showCount = 0;

        /**
         * Whether Showing is ended or not
         * @protected
         * @type {boolean}
         */
        this.ended = false;
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        this.showCount = 0;
        this.ended = false;
        this.op.next();
    }

    /**
     * Update event
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether update is endped or not
     */
    update(dt) {
        if (this.ended) {
            this.showCount -= dt / 200;
            if (this.showCount < 0) {
                this.showCount = 0;
                return true;
            }
        } else {
            this.showCount += dt / 1000;
            if (this.showCount > 1) {
                this.showCount = 1;
            }
            if (this.showCount == 1 && Input.it.isPressed(Input.key.yes())) {
                this.ended = true;
            }
        }
        return false;
    }

    /**
     * Render event
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        let id = ResourceManager.image.load(`window/win2.png`);
        let size = (this.size == -1 ? 25 : this.size) * this.showCount * this.showCount;
        let width = ctx.measureText(this.sentence, size);
        Util.renderWindow(ctx, id, this.x - (width + 64) / 2, this.y - (64 + size) / 2, width + 64, 64 + size);
        ctx.fillText(this.sentence, this.x, this.y, 0.5, 0.5, size);
    }
}
