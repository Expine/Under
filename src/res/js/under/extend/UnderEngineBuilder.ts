import { SimpleTimer } from './timer/SimpleTimer';
import { StackSceneManager } from './scene/StackSceneManager';
import { CachedMusic } from './resources/CachedMusic';
import { BufferSourceMusic } from './resources/music/BufferSourceMusic';
import { IMusicManager } from './../base/resources/IMusicManager';
import { CachedImage } from './resources/CachedImage';
import { JSContext } from './resources/image/JSContext';
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
        return new UnderEngine(
            input,
            screen,
            context,
            manager,
            music,
            timer
        );
    }

    /**
     * @override
     */
    protected makeScreen(): GameScreen
    {
        return new ScalableScreen(new DetectiveScreen());
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
    protected makeInput(screen: GameScreen): Input
    {
        return new AllInput(
            screen,
            new KeyInput(screen),
            new MouseInput(screen)
        );
    }

    /**
     * @override
     */
    protected makeContext(
        screen: GameScreen,
        image: IImageManager
    ): Context
    {
        return new JSContext(screen, image);
    }
    /**
     * @override
     */
    protected makeImageManager(): IImageManager
    {
        return new CachedImage(`src/res/image/`);
    }

    /**
     * @override
     */
    protected makeMusic(music: IMusicManager): Music
    {
        return new BufferSourceMusic(music);
    }
    /**
     * @override
     */
    protected makeMusicManager(): IMusicManager
    {
        return new CachedMusic(`src/res/sound/`);
    }
}
