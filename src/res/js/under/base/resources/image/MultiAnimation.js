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
     * Get list of animation
     * @abstract
     * @protected
     * @return {Array<GameAnimation>} List of animation
     */
    getAnimations() {}

    /**
     * Set animation into animations
     * @abstract
     * @param {GameAnimation} animation Set animation
     */
    setAnimation(animation) {}

    /**
     * Set all animation size
     * @param {number} width Image width
     * @param {number} height Image height
     */
    setAllSize(width, height) {
        for (const it of this.getAnimations()) {
            it.setSize(width, height);
        }
    }

    /**
     * Set all animation size
     * @param {number} imageID Image ID
     */
    setAllImageID(imageID) {
        for (const it of this.getAnimations()) {
            it.setImageID(imageID);
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

    /**
     * Get animation count indicating animation progress
     * @override
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
     * Get list of animation elements
     * @override
     * @protected
     * @return {Array<GameImage>} List of animation elements
     */
    getImages() {
        const anime = this.getAnimation();
        return anime === null ? [] : anime.getImages();
    }

    /**
     * Get current image of animation
     * @override
     * @protected
     * @return {GameImage} Current image of animation
     */
    getCurrentImage() {
        const anime = this.getAnimation();
        return anime === null ? null : anime.getCurrentImage();
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
}
