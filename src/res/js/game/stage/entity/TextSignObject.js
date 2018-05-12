/**
 * Immutable event object
 * - Object present on the stage that has coordinate and size
 * - Has image ID
 * - Show sign
 * - ### Show sign text
 * @extends {SignObject}
 * @classdesc Immutable event object to show sign text
 */
class TextSignObject extends SignObject { // eslint-disable-line  no-unused-vars
    /**
     * Influential event object constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Sign text
         * @protected
         * @type {string}
         */
        this.signText = ``;

        /**
         * Sign text size
         * @protected
         * @type {string}
         */
        this.size = 0;

        /**
         * Whether sign text has already exists
         * @protected
         * @type {boolean}
         */
        this.isExec = false;
    }

    /**
     * Set sign information
     * @param {number} x Sign relative x position
     * @param {number} y Sign relative y position
     * @param {number} size Sign text size
     * @param {string} text Sign text
     */
    setSign(x, y, size, text) {
        this.signX = x;
        this.signY = y;
        this.size = size;
        this.signText = text;
    }

    /**
     * Initialize entity
     * @override
     */
    init() {
        super.init();
        this.textWindow = new TextWindowEvent(this.signText, this.x + this.signX, this.y + this.signY, this.signText, this.size);
    }

    /**
     * Update entty
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        super.update(dt);
        if (this.isShowSign && !this.isExec) {
            this.textWindow.init();
        }
        if (this.isShowSign) {
            Input.key.blockInput(Input.key.sub());
            this.textWindow.update(dt);
            Input.key.unblockInput(Input.key.sub());
        }
        if (!this.isShowSign && this.isExec) {
            Input.key.unblockInput(Input.key.sub());
        }
        this.isExec = this.isShowSign;
    }
    /**
     * Render entity
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        super.render(ctx, shiftX, shiftY);
        this.textWindow.x = this.x + this.signX + shiftX;
        this.textWindow.y = this.y + this.signY + shiftY;
        if (this.isShowSign) {
            this.textWindow.render(ctx);
        }
    }
}
