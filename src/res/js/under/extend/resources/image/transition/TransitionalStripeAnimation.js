/**
 * Transitional stripe animation
 * - Renders image
 * - Manages animation
 * - Manages multiple animations
 * - Manages animation by name
 * - Considers the direction
 * - Clips area when rendering
 * - Delegates other animation
 * - ### Animates transitions to other images by stripe
 * @extends {DelegateNamedAnimation}
 * @classdesc Transitional stripe animation to animate transitions to other images by stripe
 */
class TransitionalStripeAnimation extends DelegateNamedAnimation { // eslint-disable-line  no-unused-vars
    /**
     * Transitional stripe animation constructor
     * @constructor
     * @param {NamedAnimation} baseAnimation Base image for delegation
     * @param {nunber} transitioTime Transitional time
     */
    constructor(baseAnimation, transitioTime) {
        super(baseAnimation);

        /**
         * Transitional time
         * @protected
         * @type {number}
         */
        this.transitioTime = transitioTime;


        /**
         * Old image ID
         * @protected
         * @type {number}
         */
        this.oldImageID = -1;
        /**
         * Transition image ID
         * @protected
         * @type {number}
         */
        this.transitionID = -1;
        /**
         * Transitional counter for transition
         * @protected
         * @type {number}
         */
        this.transitionCount = -1;
    }

    /**
     * Set all animation ID
     * @override
     * @param {number} imageID Image ID
     */
    setAllImageID(imageID) {
        if (this.transitionID === -1) {
            this.transitionID = imageID;
        } else {
            this.transitionCount = this.transitioTime;
        }
        this.oldImageID = this.transitionID;
        this.transitionID = imageID;
        super.setAllImageID(imageID);
    }

    /**
     * Update animation
     * @override
     * @param {number} dt
     */
    update(dt) {
        if (this.transitionCount > 0) {
            this.transitionCount -= dt / 1000;
        }
        super.update(dt);
    }

    /**
     * Render animation
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} x Image x position
     * @param {number} y Image y position
     */
    render(ctx, x, y) {
        if (this.transitionCount > 0) {
            super.setAllImageID(this.oldImageID);
            const image = super.getAnimation();
            const oldHeight = Math.floor(super.getHeight() * (this.transitionCount / this.transitioTime));
            if (BaseUtil.implementsOf(image, IClipImage)) {
                image.setClipArea(x, y, super.getWidth(), oldHeight);
            }
            super.render(ctx, x, y);

            super.setAllImageID(this.transitionID);
            const newHeight = super.getHeight() - oldHeight;
            if (BaseUtil.implementsOf(image, IClipImage)) {
                image.setClipArea(x, y + oldHeight, super.getWidth(), newHeight);
            }
            super.render(ctx, x, y);
            if (BaseUtil.implementsOf(image, IClipImage)) {
                image.setClipArea(0, 0, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
            }
        } else {
            super.render(ctx, x, y);
        }
    }
}
