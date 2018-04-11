/**
 * Scene manager
 * - ### Manages transitions of scenes, ie additions and deletions
 * @classdesc Scene manager to manage transitions of scenes
 */
class SceneManager { // eslint-disable-line  no-unused-vars
    /**
     * Scene manager constructor
     * @constructor
     */
    constructor() {
        // set singleton
        SceneManager.it = this;
    }

    /**
     * Get currently running scene
     * @interface
     * @return {Scene} Currently running scene
     */
    getScene() {}

    /**
     * Push scene instance for running it
     * @interface
     * @param {Scene} scene Scene instance for running it
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
     * @param {Scene} scene Scene instance for replacing currently scene
     */
    replaceScene(scene) {}

    /**
     * Update scene
     * @interface
     * @param {number} dt Delta time
     */
    update(dt) {}

    /**
     * Render scene
     * @interface
     * @param {Context} ctx Canvas context
     */
    render(ctx) {}
}

/**
 * Instance for singleton
 * @type {SceneManager}
 */
SceneManager.it = null;
