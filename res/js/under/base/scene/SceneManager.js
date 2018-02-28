/**
 * Manage scene
 * Manages transitions of scenes, ie additions and deletions
 * Has access to the input system to give it to the scene
 * @classdesc Manager for scene
 */
class SceneManager {
    /**
     * Get currently running scene
     * @interface
     * @return {Scene} currently running scene
     */
    getScene() {}

    /**
     * Push scene instance for running it
     * @interface
     * @param {Scene} scene scene instance for running it
     */
    pushScene(scene) {}

    /**
     * Pop currently scene for returning to the previous scene
     * @interface
     */
    popScene() {}

    /**
     * Replace currently scene by new scene
     * @interface
     * @param {Scene} scene scene instance for replacing currently scene
     */
    replaceScene(scene) {}

    /**
     * Set input system
     * @param {Input} input Input system
     */
    setInput(input) {
        /**
         * Input system
         * @protected
         * @type {Input}
         */
        this.input = input;
    }
}