import { Input } from "./input/Input";
import { GameScreen } from "./screen/GameScreen";
import { Timer } from "./timer/Timer";
import { Context } from "./resources/image/Context";
import { Music } from "./resources/music/Music";
import { SceneManager } from "./scene/SceneManager";
import { Scene } from "./scene/Scene";

/**
 * - Control the core of the game.
 * - Manages each piece of game information.
 * - Do not guarantee how the system will be used.
 * @abstract
 * @classdesc Control the core of the game to manage each piece of game information.
 */
export abstract class Engine {
    /**
     * Sets game core system.
     * @param input     Input system for managing input state.
     * @param screen    Screen system for indicating targer.
     * @param context   Context to render.
     * @param manager   Scene Manager for managing each scene process.
     * @param music     Music system for making sound.
     * @param timer     Timer for measuring time.
     */
    constructor(
        protected input:    Input,
        protected screen:   GameScreen,
        protected context:  Context,
        protected manager:  SceneManager,
        protected music:    Music,
        protected timer:    Timer
    )
    {
        this.input  = input;
        this.screen = screen;
        this.context = context;
        this.manager = manager;
        this.music = music;
        this.timer = timer;
    }

    /**
     * Intialize each system and transition initial scene.
     * Then, execute game.
     * @param scene Initial scene.
     */
    public execute(scene: Scene)
    {
        // initialize
        this.screen.init();
        this.context.init();
        this.input.init();
        // transition initial scene
        this.manager.replaceScene(scene);
        // execute process
        this.main();
    }

    /**
     * Execute game main process.
     */
    protected abstract main(): void;
}
