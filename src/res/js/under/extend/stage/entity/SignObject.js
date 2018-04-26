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
     */
    setSign(imageID) {
        this.signID = imageID;
    }

    /**
     * Initialize entity
     * @override
     */
    init() {
        this.isShowSign = false;
        this.currentHeight = 0;
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
     * @override
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
        if (this.isShowSign && currentHeight < this.height) {
            currentHeight += dt / 1000 * this.speed;
            if (currentHeight > this.height) {
                currentHeight = this.height;
            }
        }
        // hide
        if (!this.isShowSign && currentHeight > 0) {
            currentHeight -= dt / 1000 * this.speed * 3;
            if (currentHeight < 0) {
                currentHeight = 0;
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
            ctx.drawImage(this.imageID, this.x + shiftX, this.y + shiftY + this.height - currentHeight, this.width, currentHeight);
        }
        if (this.isShowSign && currentHeight == this.height) {
            if (this.signID != -1) {
                ctx.drawImage(this.signID, this.x + shiftX, this.y + shiftY - 100);
            }
        }
    }
}
