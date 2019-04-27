import { SimpleTimer } from './timer/SimpleTimer';
import { StackSceneManager } from './scene/StackSceneManager';
import { CachedMusic } from './resources/CachedMusic';
import { BufferSourceMusic } from './resources/music/BufferSourceMusic';
import { IMusicManager } from './../base/resources/IMusicManager';
import { CachedImage } from './resources/CachedImage';
import { CanvasContext } from './resources/image/CanvasContext';
import { IImageManager } from './../base/resources/IImageManager';
import { DetectiveScreen } from './screen/DetectiveScreen';
import { ScalableScreen } from './screen/ScalableScreen';
import { MouseInput } from './input/MouseInput';
import { KeyInput } from './input/KeyInput';
import { AllInput } from './input/AllInput';
import { UnderEngine } from './UnderEngine';
import { EngineBuilder } from "../base/EngineBuilder";
import { Input } from "../base/input/Input";
import { GameScreen } from "../base/screen/GameScreen";
import { Context } from "../base/resources/image/Context";
import { Music } from "../base/resources/music/Music";
import { SceneManager } from "../base/scene/SceneManager";
import { Timer } from "../base/timer/Timer";
import { Engine } from "../base/Engine";

/**
 * - Generate all necessary instances.
 * - What is shown here is default settings.
 * @classdesc Generate all default instances.
 */
export class UnderEngineBuilder
    extends EngineBuilder
{
    /**
     * @override
     */
    protected makeEngine(
        input: Input,
        screen: GameScreen,
        context: Context,
        manager: SceneManager,
        music: Music,
        timer: Timer
    ): Engine
    {
        return new UnderEngine(input, screen, context, manager, music, timer);
    }

    /**
     * @override
     */
    protected makeScreen(): GameScreen
    {
        return new ScalableScreen(new DetectiveScreen(800, 600));
    }
    /**
     * @override
     */
    protected makeTimer(): Timer
    {
        return new SimpleTimer();
    }
    /**
     * @override
     */
    protected makeSceneManager(): SceneManager
    {
        return new StackSceneManager();
    }

    /**
     * @override
     */
    protected makeInput(aScreen: GameScreen): Input
    {
        return new AllInput(
            aScreen,
            new KeyInput(aScreen),
            new MouseInput(aScreen)
        );
    }

    /**
     * @override
     */
    protected makeContext(aScreen: GameScreen, aImage: IImageManager
    ): Context
    {
        return new CanvasContext(aScreen, aImage);
    }
    /**
     * @override
     */
    protected makeImageManager(): IImageManager
    {
        return new CachedImage('src/res/image/');
    }

    /**
     * @override
     */
    protected makeMusic(aMusic: IMusicManager): Music
    {
        return new BufferSourceMusic(aMusic);
    }
    /**
     * @override
     */
    protected makeMusicManager(): IMusicManager
    {
        return new CachedMusic('src/res/sound/');
    }
}
