/**
 * Animation
 * Manages animation
 * @classdesc Animation to manage animation
 */
class Animation { // eslint-disable-line  no-unused-vars
    /**
     * Initialize animation
     * @interface
     */
    init() {}

    /**
     * Set whether to loop or not
     * @interface
     * @param {bool} loop Whether to loop or not
     */
    setLoop(loop) {}

    /**
     * Whether to loop or not
     * @interface
     * @return {bool} Whether to loop or not
     */
    isLoop() {}

    /**
     * Whether the animation has ended or not
     * @interface
     * @return {bool} Whether the animation has ended or not
     */
    isEnded() {}

    /**
     * Get animation count indicating animation progress
     * @interface
     * @return {number} Animation count
     */
    getAnimationCount() {}

    /**
     * Add animation
     * @interface
     * @param {AnimationElement} elment Animation element
     */
    addAnimation(elment) {}

    /**
     * Pause animation
     * @interface
     */
    pause() {}

    /**
     * Restore animation
     * @interface
     */
    restore() {}

    /**
     * Update animation
     * @interface
     * @param {number} dt
     */
    update(dt) {}

    /**
     * Render animation
     * @interface
     * @param {Context} ctx Canvas context
     * @param {number} x Image x position
     * @param {number} y Image y position
     * @param {number} width Image width
     * @param {number} height Image height
     * @param {number} [imageID=-1] ID of the image to be replaced (-1:not replacing)
     */
    render(ctx, x, y, width, height, imageID = -1) {}
}
