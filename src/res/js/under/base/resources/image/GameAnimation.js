/**
 * Game animation
 * - Renders image
 * - ### Manages animation
 * @interface
 * @extends {GameImage}
 * @classdesc Game animation to manage animation
 */
class GameAnimation extends GameImage { // eslint-disable-line  no-unused-vars
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
     * Pause animation
     * @abstract
     */
    pause() {}

    /**
     * Restore animation
     * @abstract
     */
    restore() {}
}
