/**
 * Named animation
 * - Renders image
 * - Manages animation
 * - Manages multiple animations
 * - ### Manages animation by name
 * @interface
 * @extends {MultiAnimation}
 * @classdesc Named animation to manage animation by name
 */
class NamedAnimation extends MultiAnimation {
    /**
     * Set animation name
     * @abstract
     * @param {string} name Animation name
     */
    setName(name) {}
}
