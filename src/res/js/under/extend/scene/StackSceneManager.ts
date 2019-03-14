import { SceneManager } from "../../base/scene/SceneManager";
import { Scene } from "../../base/scene/Scene";

/**
 * Stack scene manager
 * - Uses the stack to manage scenes
 * @extends {SceneManager}
 * @classdesc Stack scene manager using the stack to manage scenes
 */
export class StackSceneManager extends SceneManager {
    /**
     * Scene stack
     * @protected
     * @type {Array<Scene>}
     */
    protected scenes: Array<Scene>;

    /**
    * Stack scene manager constructor
    * @constructor
    */
    constructor() {
        super();
        this.scenes = [];
    }

    /**
     * Get currently running scene
     * @override
     * @return {Scene} Currently running scene
     */
    getScene(): Scene {
        return this.scenes[this.scenes.length - 1];
    }

    /**
     * Push scene instance for running it
     * @override
     * @param {Scene} scene Scene instance for running it
     */
    pushScene(scene: Scene) {
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
