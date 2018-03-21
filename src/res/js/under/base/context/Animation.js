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
     * @param {bool} isLoop Whether to loop or not
     */
    setLoop(isLoop) {}

    /**
     * Whether the animation has ended or not
     * @return {bool} Whether the animation has ended or not
     */
    isEnded() {}

    /**
     * Add animation
     * @interface
     * @param {AnimationElement} elment Animation element
     */
    addAnimatiion(elment) {}

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
