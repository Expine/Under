import { Input } from "./input/Input";
import { GameScreen } from "./screen/GameScreen";
import { Timer } from "./timer/Timer";
import { Context } from "./resources/image/Context";
import { Music } from "./resources/music/Music";
import { SceneManager } from "./scene/SceneManager";
import { Scene } from "./scene/Scene";

/**
 * Engine
 * - Control the core of the game
 * - Manages each piece of game information
 * - Fires update and rendering processing respectively
 * @interface
 * @classdesc Engine for control the core of the game to manage each piece of game information
 */
export abstract class Engine {
    /**
     * Input system instance
     * @protected
     * @type {Input}
     */
    protected input: Input;
    /**
     * Screen system
     * @protected
     * @type {GameScreen}
     */
    protected screen: GameScreen;
    /**
     * Context tp render
     * @protected
     * @type {Context}
     */
    protected context: Context;
    /**
     * Scene manager
     * @protected
     * @type {SceneManager}
     */
    protected manager: SceneManager
    /**
     * Music system
     * @protected
     * @type {Music}
     */
    protected music: Music
    /**
     * Timer
     * @protected
     * @type {Timer}
     */
    protected timer: Timer

    /**
     * Engine constructor
     * @constructor
     * @param {Input} input Input system
     * @param {GameScreen} screen Screen system
     * @param {Context} context Context to render
     * @param {SceneManager} manager Scene Manager
     * @param {Music} music Music system
     * @param {Timer} timer Timer
     */
    constructor(input: Input, screen: GameScreen, context: Context, manager: SceneManager, music: Music, timer: Timer) {
        this.input = input;
        this.screen = screen;
        this.context = context;
        this.manager = manager;
        this.music = music;
        this.timer = timer;
    }

    /**
     * Execute engine
     * @param {Scene} scene First scene
     */
    execute(scene: Scene) {
        // initialize
        this.screen.init();
        this.context.init();
        this.input.init();
        // transition
        this.manager.replaceScene(scene);
        // execute process
        this.main();
    }

    /**
     * Game main process
     * @abstract
     * @protected
     */
    main() { }
}
