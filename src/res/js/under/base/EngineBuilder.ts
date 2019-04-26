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
     * @param aInput    Input system for managing input state.
     * @param aScreen   Screen system for indicating targer.
     * @param aContext  Context to render.
     * @param aManager  Scene Manager for managing each scene process.
     * @param aMusic    Music system for making sound.
     * @param aTimer    Timer for measuring time.
     * @return Generated game engine.
     */
    protected abstract makeEngine(
        aInput: Input,
        aScreen: GameScreen,
        aContext: Context,
        aManager: SceneManager,
        aMusic: Music,
        aTimer: Timer
    ): Engine;

    protected abstract makeScreen(): GameScreen;
    protected abstract makeTimer(): Timer;
    protected abstract makeSceneManager(): SceneManager;

    /**
     * @param aScreen Screen for input target.
     */
    protected abstract makeInput(aScreen: GameScreen): Input;

    /**
     * @param aScreen Screen for rendering target.
     * @param aImage Image manager for managing image resources.
     */
    protected abstract makeContext(aScreen: GameScreen, aImage: IImageManager): Context;
    protected abstract makeImageManager(): IImageManager;

    /**
     * @param aMusic Music manager for managing music resources.
     */
    protected abstract makeMusic(aMusic: IMusicManager): Music;
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
