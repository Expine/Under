/**
 * Stack scene manager
 * - Manages transitions of scenes, ie additions and deletions
 * - ### Uses the stack to manage scenes
 * @extends {SceneManager}
 * @classdesc Stack scene manager using the stack to manage scenes
 */
class StackSceneManager extends SceneManager { // eslint-disable-line  no-unused-vars
    /**
     * Stack scene manager constructor
     * @constructor
     */
    constructor() {
        super();
        /**
         * Scene stack
         * @protected
         * @type {Array<Scene>}
         */
        this.scenes = [];
    }

    /**
     * Get currently running scene
     * @override
     * @return {Scene} Currently running scene
     */
    getScene() {
        return this.scenes[this.scenes.length - 1];
    }

    /**
     * Push scene instance for running it
     * @override
     * @param {Scene} scene Scene instance for running it
     */
    pushScene(scene) {
        this.scenes.push(scene);
        super.pushScene(scene);
    }

    /**
     * Pop currently scene for returning to the previous scene
     * @override
     */
    popScene() {
        this.scenes.pop();
    }
}
