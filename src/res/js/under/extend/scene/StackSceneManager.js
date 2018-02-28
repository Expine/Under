/**
 * Manage scene by stack
 * Use the stack to manage scenes
 * @implements {SceneManager}
 * @classdesc Manager for scene by using stack
 * @example
 * let engine = new UnderEngine("relative/path");
 * engine.setSceneManager(new StackSceneManager());
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
         * @type {Array<Scene>}
         */
        this.scenes_ = [];
    }

    /**
     * Get currently running scene
     * @override
     * @return {Scene} currently running scene
     */
    getScene() {
        return this.scenes_[0];
    }

    /**
     * Push scene instance for running it
     * @override
     * @param {Scene} scene scene instance for running it
     */
    pushScene(scene) {
        scene.setInput(this.input);
        scene.setSceneManager(this);
        this.scenes_.push(scene);
    }

    /**
     * Pop currently scene for returning to the previous scene
     * @override
     */
    popScene() {
        this.scenes_.pop();
    }

    /**
     * Replace currently scene by new scene
     * @override
     * @param {Scene} scene scene instance for replacing currently scene
     */
    replaceScene(scene) {
        this.scenes_.length = 0;
        this.pushScene(scene);
    }

    /**
     * Update scene
     * @interface
     * @param {number} dt delta time
     */
    update(dt) {
        this.getScene().update(dt);
    }

    /**
     * Render scene
     * @interface
     * @param {Context} ctx - canvas context
     */
    render(ctx) {
        this.getScene().render(ctx);
    }
}
