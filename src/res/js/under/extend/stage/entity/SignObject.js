/**
 * Immutable event object
 * - Object present on the stage that has coordinate and size
 * - Has image ID
 * - ### Fire event
 * @implements {ImagedEntity}
 * @classdesc Immutable event object to fire event
 */
class SignObject extends ImagedEntity { // eslint-disable-line  no-unused-vars
    /**
     * Influential event object constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Sign image ID for rendering
         * @protected
         * @type {number}
         */
        this.signID = -1;

        /**
         * Sign collider for
         * @protected
         * @type {Collider}
         */
        this.signCollider = null;

        /**
         * Whether sign can be showed or not
         * @protected
         * @type {boolean}
         */
        this.isShowSign = false;

        /**
         * Sign current height
         * @protected
         * @type {number}
         */
        this.currentHeight = 0;

        /**
         * Show speed
         * @protected
         * @type {number}
         */
        this.speed = 100;
    }

    /**
     * Set sign information
     * @param {number} imageID Sign image ID
     * @param {Collider} collider Sign collider
     */
    setSign(imageID, collider) {
        this.signID = imageID;
        this.signCollider = collider;
        this.signCollider.setEntity(this);
    }

    /**
     * Initialize entity
     * @override
     */
    init() {
        this.isShowSign = false;
        this.currentHeight = 0;
        this.signCollider.init();
    }

    /**
     * Update entty
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        this.isShowSign = false;
        for (let it of this.stage.getPhysicalWorld().getCollisionData(this.signCollider)) {
            let you = Util.getCollidedEntity(this, it);
            if (BaseUtil.implementsOf(you, IPlayable)) {
                this.isShowSign = true;
                break;
            }
        }
        // show
        if (this.isShowSign && this.currentHeight < this.height) {
            this.currentHeight += dt / 1000 * this.speed;
            if (this.currentHeight > this.height) {
                this.currentHeight = this.height;
            }
        }
        // hide
        if (!this.isShowSign && this.currentHeight > 0) {
            this.currentHeight -= dt / 1000 * this.speed * 3;
            if (this.currentHeight < 0) {
                this.currentHeight = 0;
            }
        }
    }

    /**
     * Render entity
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        if (this.imageID != -1) {
            ctx.drawImage(this.imageID, this.x + shiftX, this.y + shiftY + this.height - this.currentHeight, this.width, this.currentHeight);
        }
        if (this.isShowSign && this.currentHeight == this.height) {
            if (this.signID != -1) {
                ctx.drawImage(this.signID, this.x + shiftX, this.y + shiftY - 100);
            }
        }
        if (Engine.debug) {
            this.signCollider.render(ctx, shiftX, shiftY);
        }
    }
}
