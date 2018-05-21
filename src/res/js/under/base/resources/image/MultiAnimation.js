/**
 * Multi animation
 * - Renders image
 * - Manages animation
 * - ### Manages multiple animations
 * @interface
 * @extends {GameAnimation}
 * @classdesc Multi animation to manage multiple animations
 */
class MultiAnimation extends GameAnimation { // eslint-disable-line  no-unused-vars
    /**
     * Get animation from animations
     * @abstract
     * @return {GameAnimation} animation
     */
    getAnimation() {}

    /**
     * Set animation into animations
     * @abstract
     * @param {GameAnimation} animation Set animation
     */
    setAnimation(animation) {}

    /**
     * Set all animation size
     * @abstract
     * @param {number} width Image width
     * @param {number} height Image height
     */
    setAllSize(width, height) {}

    /**
     * Set all animation size
     * @abstract
     * @param {number} imageID Image ID
     */
    setAllImageID(imageID) {}

    /**
     * Set image size
     * @override
     * @param {number} width Image width
     * @param {number} height Image height
     */
    setSize(width, height) {
        const anime = this.getAnimation();
        if (anime !== null) {
            anime.setSize(width, height);
        }
    }

    /**
     * Set image ID
     * @override
     * @param {number} imageID Image ID
     */
    setImageID(imageID) {
        const anime = this.getAnimation();
        if (anime !== null) {
            anime.setImageID(imageID);
        }
    }

    /**
     * Get image width
     * @override
     * @return {number} Imag width
     */
    getWidth() {
        const anime = this.getAnimation();
        return anime !== null ? anime.getWidth() : 0;
    }

    /**
     * Get image height
     * @override
     * @return {number} Imag height
     */
    getHeight() {
        const anime = this.getAnimation();
        return anime !== null ? anime.getHeight() : 0;
    }

    /**
     * Initialize animation
     * @override
     */
    init() {
        const anime = this.getAnimation();
        if (anime !== null) {
            anime.init();
        }
    }

    /**
     * Update animation
     * @override
     * @param {number} dt
     */
    update(dt) {
        const anime = this.getAnimation();
        if (anime !== null) {
            anime.update(dt);
        }
    }

    /**
     * Render animation
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} x Image x position
     * @param {number} y Image y position
     */
    render(ctx, x, y) {
        const anime = this.getAnimation();
        if (anime !== null) {
            anime.render(ctx, x, y);
        }
    }

    /**
     * Whether to loop or not
     * @override
     * @return {boolean} Whether to loop or not
     */
    isLoop() {
        const anime = this.getAnimation();
        return anime !== null && anime.isLoop();
    }

    /**
     * Whether the animation has ended or not
     * @override
     * @return {boolean} Whether the animation has ended or not
     */
    isEnded() {
        const anime = this.getAnimation();
        return anime !== null && anime.isEnded();
    }

    /**
     * Get animation count indicating animation progress
     * @return {number} Animation count
     */
    getAnimationCount() {
        const anime = this.getAnimation();
        return anime !== null ? anime.getAnimationCount() : 0;
    }

    /**
     * Add animation
     * @override
     * @param {GameImage} image Animation element
     * @param {number} delta Animation delta time
     */
    addAnimation(image, delta) {
        const anime = this.getAnimation();
        if (anime !== null) {
            anime.addAnimation(image, delta);
        }
    }

    /**
     * Pause animation
     * @override
     */
    pause() {
        const anime = this.getAnimation();
        if (anime !== null) {
            anime.pause();
        }
    }

    /**
     * Restore animation
     * @override
     */
    restore() {
        const anime = this.getAnimation();
        if (anime !== null) {
            anime.restore();
        }
    }
}
