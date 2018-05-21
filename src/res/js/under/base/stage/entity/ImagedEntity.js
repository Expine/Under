/**
 * Imaged entity
 * - Object present on the stage that has coordinate and size
 * - ### Has image ID
 * @interface
 * @extends {Entity}
 * @classdesc Imaged entity to have image ID
 */
class ImagedEntity extends Entity { // eslint-disable-line  no-unused-vars
    /**
     * Imaged entity constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Image ID
         * @protected
         * @type {GameImage}
         */
        this.image = null;
    }
    /**
     * Set image
     * @param {GameImage} image Image
     */
    setImage(image) {
        this.image = image;
    }

    /**
     * Get image
     * @return {GameImage} Image
     */
    getImage() {
        return this.image;
    }

    /**
     * Set entity size
     * @override
     * @param {number} width Entity width
     * @param {number} height Entity height
     */
    setSize(width, height) {
        super.setSize(width, height);
        if (this.image !== null) {
            this.image.setSize(width, height);
        }
    }

    /**
     * Initialize entity
     * @override
     */
    init() {
        if (this.image !== null) {
            this.image.init();
        }
    }

    /**
     * Update entty
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        if (this.image !== null) {
            this.image.update(dt);
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
        if (this.image !== null) {
            this.image.render(ctx, this.x + shiftX, this.y + shiftY);
        }
    }
}
