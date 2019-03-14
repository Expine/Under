/**
 * Game animation
 * - Renders image
 * - ### Manages animation
 * @interface
 * @extends {GameImage}
 * @classdesc Game animation to manage animation
 */
class GameAnimation extends GameImage {
    /**
     * Whether to loop or not
     * @abstract
     * @return {boolean} Whether to loop or not
     */
    isLoop() {}

    /**
     * Whether the animation has ended or not
     * @abstract
     * @return {boolean} Whether the animation has ended or not
     */
    isEnded() {}

    /**
     * Pause animation
     * @abstract
     */
    pause() {}

    /**
     * Restore animation
     * @abstract
     */
    restore() {}

    /**
     * Get animation count indicating animation progress
     * @abstract
     * @return {number} Animation count
     */
    getAnimationCount() {}

    /**
     * Add animation
     * @abstract
     * @param {GameImage} image Animation element
     * @param {number} delta Animation delta time
     */
    addAnimation(image, delta) {}

    /**
     * Get list of animation elements
     * @abstract
     * @protected
     * @return {Array<GameImage>} List of animation elements
     */
    getImages() {}

    /**
     * Get current image of animation
     * @abstract
     * @protected
     * @return {GameImage} Current image of animation
     */
    getCurrentImage() {}

    /**
     * Set image size
     * @override
     * @param {number} width Image width
     * @param {number} height Image height
     */
    setSize(width, height) {
        for (const it of this.getImages()) {
            it.setSize(width, height);
        }
    }

    /**
     * Set image ID
     * @override
     * @param {number} imageID Image ID
     */
    setImageID(imageID) {
        for (const it of this.getImages()) {
            it.setImageID(imageID);
        }
    }

    /**
     * Get image ID
     * @abstract
     * @return {number} Image ID
     */
    getImageID() {
        return this.getCurrentImage() === null ? 0 : this.getCurrentImage().getImageID();
    }

    /**
     * Get image width
     * @override
     * @return {number} Imag width
     */
    getWidth() {
        return this.getCurrentImage() === null ? 0 : this.getCurrentImage().getWidth();
    }

    /**
     * Get image height
     * @override
     * @return {number} Imag height
     */
    getHeight() {
        return this.getCurrentImage() === null ? 0 : this.getCurrentImage().getHeight();
    }

    /**
     * Get source offset x position
     * @override
     * @protected
     * @type {number}
     */
    getSourceOffsetX() {
        return this.getCurrentImage() === null ? 0 : this.getCurrentImage().getSourceOffsetX();
    }

    /**
     * Get source offset y position
     * @override
     * @protected
     * @type {number}
     */
    getSourceOffsetY() {
        return this.getCurrentImage() === null ? 0 : this.getCurrentImage().getSourceOffsetY();
    }

    /**
     * Get source width
     * @override
     * @protected
     * @type {number}
     */
    getSourceWidth() {
        return this.getCurrentImage() === null ? 0 : this.getCurrentImage().getSourceWidth();
    }

    /**
     * Get source height
     * @override
     * @protected
     * @type {number}
     */
    getSourceHeight() {
        return this.getCurrentImage() === null ? 0 : this.getCurrentImage().getSourceHeight();
    }

    /**
     * Initialize image
     * @override
     */
    init() {
        for (const it of this.getImages()) {
            it.init();
        }
    }

    /**
     * Update image
     * @override
     * @param {number} dt
     */
    update(dt) {
        const image = this.getCurrentImage();
        if (image !== null) {
            image.update(dt);
        }
    }

    /**
     * Render image
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} x Image x position
     * @param {number} y Image y position
     */
    render(ctx, x, y) {
        const image = this.getCurrentImage();
        if (image !== null) {
            image.render(ctx, x, y);
        }
    }
}
