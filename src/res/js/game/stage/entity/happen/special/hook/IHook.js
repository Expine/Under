/**
 * Hook interface
 * - ### It can get hook position and change state
 * @classdesc Hook interface that can get hook position and change state
 */
class IHook extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Get actor who it belongs to
     * @interface
     * @return {Entity} Actor who it belongs to
     */
    getActor() {}

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
     * Create post hook (Do not create it if it already exists)
     * @interface
     */
    createPost() {}

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
     * Try to remove it
     * @interface
     * @return {bool} Whether it was removed
     */
    tryRemove() {}

    /**
     * Whether the tip of the hook
     * @interface
     * @return {bool} Whether the tip of the hook
     */
    isHead() {}
}
