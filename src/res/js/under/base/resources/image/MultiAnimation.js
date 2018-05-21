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
        let anime = this.getAnimation();
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
        let anime = this.getAnimation();
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
        let anime = this.getAnimation();
        return anime !== null ? anime.getWidth() : 0;
    }

    /**
     * Get image height
     * @override
     * @return {number} Imag height
     */
    getHeight() {
        let anime = this.getAnimation();
        return anime !== null ? anime.getHeight() : 0;
    }

    /**
     * Initialize animation
     * @override
     */
    init() {
        let anime = this.getAnimation();
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
        let anime = this.getAnimation();
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
        let anime = this.getAnimation();
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
        let anime = this.getAnimation();
        return anime !== null && anime.isLoop();
    }

    /**
     * Whether the animation has ended or not
     * @override
     * @return {boolean} Whether the animation has ended or not
     */
    isEnded() {
        let anime = this.getAnimation();
        return anime !== null && anime.isEnded();
    }

    /**
     * Get animation count indicating animation progress
     * @return {number} Animation count
     */
    getAnimationCount() {
        let anime = this.getAnimation();
        return anime !== null ? anime.getAnimationCount() : 0;
    }

    /**
     * Add animation
     * @override
     * @param {GameImage} image Animation element
     * @param {number} delta Animation delta time
     */
    addAnimation(image, delta) {
        let anime = this.getAnimation();
        if (anime !== null) {
            anime.addAnimation(image, delta);
        }
    }

    /**
     * Pause animation
     * @override
     */
    pause() {
        let anime = this.getAnimation();
        if (anime !== null) {
            anime.pause();
        }
    }

    /**
     * Restore animation
     * @override
     */
    restore() {
        let anime = this.getAnimation();
        if (anime !== null) {
            anime.restore();
        }
    }
}
