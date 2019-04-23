import { IMusicManager } from './resources/IMusicManager';
import { IImageManager } from './resources/IImageManager';
import { Input } from "./input/Input";
import { GameScreen } from "./screen/GameScreen";
import { Context } from "./resources/image/Context";
import { SceneManager } from "./scene/SceneManager";
import { Music } from "./resources/music/Music";
import { Timer } from "./timer/Timer";
import { Engine } from "./Engine";

/**
 * - Performs initial construction of the game engine.
 * - Generates engine and others, and set them in the engine.
 * @abstract
 * @classdesc Perform initial construction of the game engine to set elements in it.
 */
export abstract class EngineBuilder
{
    /**
     * Make game engine by some elements.
     * @param input     Input system for managing input state.
     * @param screen    Screen system for indicating targer.
     * @param context   Context to render.
     * @param manager   Scene Manager for managing each scene process.
     * @param music     Music system for making sound.
     * @param timer     Timer for measuring time.
     * @return Generated game engine.
     */
    protected abstract makeEngine(
        input: Input,
        screen: GameScreen,
        context: Context,
        manager: SceneManager,
        music: Music,
        timer: Timer
    ): Engine;

    protected abstract makeScreen(): GameScreen;
    protected abstract makeTimer(): Timer;
    protected abstract makeSceneManager(): SceneManager;

    /**
     * @param screen Screen for input target.
     */
    protected abstract makeInput(screen: GameScreen): Input;

    /**
     * @param screen Screen for rendering target.
     * @param image Image manager for managing image resources.
     */
    protected abstract makeContext(
        screen: GameScreen,
        image: IImageManager
    ): Context;
    protected abstract makeImageManager(): IImageManager;

    /**
     * @param music Music manager for managing music resources.
     */
    protected abstract makeMusic(music: IMusicManager): Music;
    protected abstract makeMusicManager(): IMusicManager;


    /**
     * Builds game core system and engine.
     * @return Generated game engine with core system.
     */
    public build(): Engine
    {
        const screen = this.makeScreen();
        return this.makeEngine(
            this.makeInput(screen),
            screen,
            this.makeContext(screen, this.makeImageManager()),
            this.makeSceneManager(),
            this.makeMusic(this.makeMusicManager()),
            this.makeTimer()
        );
    }
}
