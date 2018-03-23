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
     * Add animation
     * @interface
     * @param {AnimationElement} elment Animation element
     */
    addAnimation(elment) {}

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
     */
    render(ctx, x, y, width, height) {}
}
