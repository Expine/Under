/**
 * Multi animation
 * - Manages animation
 * - ### Manages multiple animations
 * @interface
 * @classdesc Multi animation to manage multiple animations
 */
class MultiAnimation extends Animation { // eslint-disable-line  no-unused-vars
    /**
     * Get animation from animations
     * @abstract
     * @return {Animation} animation
     */
    getAnimation() {}

    /**
     * Set animation into animations
     * @abstract
     * @param {Animation} animation
     */
    setAnimation(animation) {}
}
