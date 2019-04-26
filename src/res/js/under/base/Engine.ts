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
export abstract class Engine
{
    /**
     * Sets game core system.
     * @param mInput    Input system for managing input state.
     * @param mScreen   Screen system for indicating targer.
     * @param mContext  Context to render.
     * @param mManager  Scene Manager for managing each scene process.
     * @param mMusic    Music system for making sound.
     * @param mTimer    Timer for measuring time.
     */
    constructor(
        protected mInput:    Input,
        protected mScreen:   GameScreen,
        protected mContext:  Context,
        protected mManager:  SceneManager,
        protected mMusic:    Music,
        protected mTimer:    Timer
    )
    { }

    /**
     * Intialize each system and transition initial scene.
     * Then, execute game.
     * @param aScene Initial scene.
     */
    public execute(aScene: Scene)
    {
        // transition initial scene
        this.mManager.replaceScene(aScene);
        // execute process
        this.main();
    }

    /**
     * Execute game main process.
     */
    protected abstract main(): void;
}
