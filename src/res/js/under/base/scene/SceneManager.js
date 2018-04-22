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
     * @protected
     * @return {Scene} Currently running scene
     */
    getScene() {}

    /**
     * Push scene instance for running it
     * @interface
     * @param {Scene} scene Scene instance for running it
     */
    pushScene(scene) {
        scene.init();
    }

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
     * @param {number} dt Delta time
     */
    update(dt) {
        this.getScene().update(dt);
    }

    /**
     * Render scene
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        this.getScene().render(ctx);
    }
}

/**
 * Instance for singleton
 * @type {SceneManager}
 */
SceneManager.it = null;
