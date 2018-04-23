/**
 * Named animation
 * - Manages animation
 * - Manages multiple animations
 * - ### Manages animation by name
 * @interface
 * @implements {MultiAnimation}
 * @classdesc Named animation to manage animation by name
 */
class NamedAnimation extends MultiAnimation { // eslint-disable-line  no-unused-vars
    /**
     * Set animation name
     * @abstract
     * @param {string} name Animation name
     * @return {NamedAnimation} This instance
     */
    setName(name) {}
}
