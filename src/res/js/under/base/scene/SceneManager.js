/**
 * Scene manager
 * - ### Manages transitions of scenes, ie additions and deletions
 * @interface
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
     * @abstract
     * @protected
     * @return {Scene} Currently running scene
     */
    getScene() {}

    /**
     * Push scene instance for running it
     * @param {Scene} scene Scene instance for running it
     */
    pushScene(scene) {
        scene.init();
    }

    /**
     * Pop currently scene for returning to the previous scene
     * @abstract
     */
    popScene() {}

    /**
     * Replace currently scene by new scene
     * @param {Scene} scene Scene instance for replacing currently scene
     */
    replaceScene(scene) {
        this.popScene();
        this.pushScene(scene);
    }

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
