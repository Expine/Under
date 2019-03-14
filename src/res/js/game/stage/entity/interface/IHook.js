/**
 * Hook interface
 * - ### It can get hook position and change state
 * @interface
 * @classdesc Hook interface that can get hook position and change state
 */
class IHook extends Interface {
    /**
     * Get actor who it belongs to
     * @abstract
     * @return {Entity} Actor who it belongs to
     */
    getActor() {}

    /**
     * Create post hook (Do not create it if it already exists)
     * @abstract
     */
    createPost() {}

    /**
     * Hooked hook
     * @abstract
     */
    hooked() {}

    /**
     * Release hook
     * @abstract
     */
    release() {}

    /**
     * Try to remove it
     * @abstract
     * @return {boolean} Whether it was removed
     */
    tryRemove() {}

    /**
     * Whether the tip of the hook
     * @abstract
     * @return {boolean} Whether the tip of the hook
     */
    isHead() {}
}
