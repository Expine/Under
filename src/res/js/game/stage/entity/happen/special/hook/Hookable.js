/**
 * Hookable
 * It belongs to the character and releasing of the hook is possible
 * @classdesc Hookable that belongs to the character and releasing of the hook is possible
 */
class Hookable extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Get actor who it belongs to
     * @interface
     * @return {Entity} Actor who it belongs to
     */
    getActor() {}

    /**
     * Get hook length
     * @interface
     * @return {number} Hook length
     */
    getLength() {}

    /**
     * Hook center x position
     * @interface
     * @return {number} Hook center x position
     */
    getHookX() {}

    /**
     * Hook center x position
     * @interface
     * @return {number} Hook center x position
     */
    getHookY() {}

    /**
     * Get previous entity
     * @interface
     * @return {Hookable} Previous entity
     */
    getPrevious() {}

    /**
     * Hooked hook
     * @interface
     */
    hooked() {}

    /**
     * Release hook
     * @interface
     */
    release() {}

    /**
     * Enforce tension
     * @param {number} x Tension of x
     * @param {number} y Tension of y
     * @param {number} dt Delta time
     */
    tension(x, y, dt) {}
}
