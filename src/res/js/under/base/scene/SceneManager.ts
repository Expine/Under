import { Scene } from "./Scene";
import { Context } from "../resources/image/Context";

/**
 * Scene manager
 * - Manages transitions of scenes, ie additions and deletions
 * @abstract
 * @classdesc Scene manager to manage transitions of scenes
 */
export abstract class SceneManager {
    /**
     * Instance for singleton
     * @type {SceneManager}
     */
    static it: SceneManager;

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
    protected abstract getScene(): Scene;

    /**
     * Push scene instance for running it
     * @param {Scene} scene Scene instance for running it
     */
    pushScene(scene: Scene) {
        scene.init();
    }

    /**
     * Pop currently scene for returning to the previous scene
     * @abstract
     */
    abstract popScene(): void;

    /**
     * Replace currently scene by new scene
     * @param {Scene} scene Scene instance for replacing currently scene
     */
    replaceScene(scene: Scene) {
        this.popScene();
        this.pushScene(scene);
    }

    /**
     * Update scene
     * @param {number} dt Delta time
     */
    update(dt: number) {
        this.getScene().update(dt);
    }

    /**
     * Render scene
     * @param {Context} ctx Canvas context
     */
    render(ctx: Context) {
        this.getScene().render(ctx);
    }
}
