/**
 * Immutable event object
 * - Object present on the stage that has coordinate and size
 * - Has image ID
 * - It can be collided because it has material and collider
 * - It is fixed and no change will occur
 * - ### Fire event
 * @implements {ImmutableEntity}
 * @classdesc Immutable event object to fire event
 */
class SignObject extends ImmutableEntity { // eslint-disable-line  no-unused-vars
    /**
     * Influential event object constructor
     * @constructor
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} width Entity width
     * @param {number} height Entity height
     * @param {number} [imageID=-1] Image ID for rendering (if has not, -1)
     * @param {number} [signID=-1] Sign image ID for rendering (if has not, -1)
     */
    constructor(x, y, width, height, imageID = -1, signID = -1) {
        super(x, y, width, height, imageID);

        /**
         * Sign image ID for rendering
         * @protected
         * @type {number}
         */
        this.signID = signID;

        /**
         * Whether sign can be showed or not
         * @protected
         * @type {bool}
         */
        this.isShowSign = false;

        /**
         * Sign original height
         * @protected
         * @type {number}
         */
        this.originalHeight = height;

        /**
         * Show speed
         * @protected
         * @type {number}
         */
        this.speed = 100;
    }

    /**
     * Initialize entity
     * @override
     */
    init() {
        this.isShowSign = false;
        this.height = 0;
    }

    /**
     * Set collider
     * @override
     * @param {Collider} collider collider
     */
    setCollider(collider) {
        super.setCollider(collider);
        collider.response = false;
    }

    /**
     * Update entty
     * @interface
     * @param {number} dt Delta time
     */
    update(dt) {
        this.isShowSign = false;
        for (let it of this.collider.collisions) {
            let you = Util.getCollidedEntity(this, it);
            if (BaseUtil.implementsOf(you, IPlayable)) {
                this.isShowSign = true;
                break;
            }
        }
        // show
        if (this.isShowSign && this.height < this.originalHeight) {
            this.height += dt / 1000 * this.speed;
            if (this.height > this.originalHeight) {
                this.height = this.originalHeight;
            }
        }
        // hide
        if (!this.isShowSign && this.height > 0) {
            this.height -= dt / 1000 * this.speed * 3;
            if (this.height < 0) {
                this.height = 0;
            }
        }
    }

    /**
     * Render entity
     * @interface
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        if (this.imageID != -1) {
            ctx.drawImage(this.imageID, this.x + shiftX, this.y + shiftY + this.originalHeight - this.height, this.width, this.height);
        }
        if (this.isShowSign && this.height == this.originalHeight) {
            if (this.signID != -1) {
                ctx.drawImage(this.signID, this.x + shiftX, this.y + shiftY - 100, this.width, this.height);
            }
        }
    }
}
