/**
 * Immutable event object
 * - Object present on the stage that has coordinate and size
 * - Has image ID
 * - Object that has collide
 * - ### Show sign
 * @extends {ImagedEntity}
 * @implements {IColliderable}
 * @classdesc Immutable event object to show sign
 */
class SignObject extends ImagedEntity /* , IColliderable */ { // eslint-disable-line  no-unused-vars
    /**
     * Influential event object constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Sign image
         * @protected
         * @type {GameImage}
         */
        this.signImage = null;
        /**
         * Sign realative x position
         * @protected
         * @type {number}
         */
        this.signX = 0;
        /**
         * Sign realative y position
         * @protected
         * @type {number}
         */
        this.signY = 0;

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
         * Show speed
         * @protected
         * @type {number}
         */
        this.speed = 100;
    }

    /**
     * Set sign information
     * @param {GameImage} signImage Sign image
     * @param {number} x Sign relative x position
     * @param {number} y Sign relative y position
     */
    setSign(signImage, x, y) {
        this.signImage = signImage;
        this.signX = x;
        this.signY = y;
    }

    /**
     * Set collider
     * @param {Collider} collider collider
     */
    setCollider(collider) {
        this.signCollider = collider;
        this.signCollider.setEntity(this);
    }

    /**
     * Get collider
     * @override
     * @return {Collider} Collider that object has
     */
    getCollider() {
        return this.signCollider;
    }

    /**
     * Initialize entity
     * @override
     */
    init() {
        if (this.signImage !== null) {
            this.signImage.init();
        }
        this.signCollider.init();
        this.isShowSign = false;
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
        if (this.isShowSign) {
            super.update(dt);
            // show
            if (this.signImage !== null && Util.canEnd(this.image)) {
                this.signImage.update(dt);
            }
        } else {
            // hide
            if (this.signImage !== null) {
                this.signImage.init();
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
        super.render(ctx, shiftX, shiftY);
        if (this.signImage !== null && this.isShowSign && Util.canEnd(this.image)) {
            this.signImage.render(ctx, this.x + shiftX + this.signX, this.y + shiftY + this.signY);
        }
    }
}
