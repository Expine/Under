/**
 * Animation
 * - ### Manages animation
 * @interface
 * @classdesc Animation to manage animation
 */
class Animation { // eslint-disable-line  no-unused-vars
    /**
     * Initialize animation
     * @abstract
     */
    init() {}

    /**
     * Set whether to loop or not
     * @abstract
     * @param {boolean} loop Whether to loop or not
     */
    setLoop(loop) {}

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
     * @param {AnimationElement} elment Animation element
     */
    addAnimation(elment) {}

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
     * Update animation
     * @abstract
     * @param {number} dt
     */
    update(dt) {}

    /**
     * Render animation
     * @abstract
     * @param {Context} ctx Canvas context
     * @param {number} x Image x position
     * @param {number} y Image y position
     * @param {number} width Image width
     * @param {number} height Image height
     * @param {number} [imageID=-1] ID of the image to be replaced (-1:not replacing)
     */
    render(ctx, x, y, width, height, imageID = -1) {}
}
