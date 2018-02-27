/**
 * Manage scene by stack
 * Use the stack to manage scenes
 * @classdesc Manager for scene by using stack
 * @extends SceneManager
 */
class StackSceneManager extends SceneManager {
    /**
     * Constructor for stack scene manager
     * @constructor
     */
    constructor() {
        super();
        /**
         * Scene stack
         * @type {Array<Scene>}
         */
        this.scenes_ = new Array();
    }

    /**
     * Get currently running scene
     * @interface
     * @return {Scene} currently running scene
     */
    getScene() {
        return this.scenes_[0];
    }

    /**
     * Push scene instance for running it
     * @interface
     * @param {Scene} scene scene instance for running it
     */
    pushScene(scene) {
        scene.setInput(this.input);
        scene.setSceneManager(this);
        this.scenes_.push(scene);
    }

    /**
     * Pop currently scene for returning to the previous scene
     * @interface
     */
    popScene() {
        this.scenes_.pop();
    }

    /**
     * Replace currently scene by new scene
     * @interface
     * @param {Scene} scene scene instance for replacing currently scene
     */
    replaceScene(scene) {
        this.scenes_.length = 0;
        this.pushScene(scene);
    }
}