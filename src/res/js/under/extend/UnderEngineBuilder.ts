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
 * Under engine builder
 * - Generates all necessary instances
 * @extends {EngineBuilder}
 * @classdesc Under engine builder to perform initial construction of the game engine
 */
export class UnderEngineBuilder extends EngineBuilder {
    /**
     * Make game engine
     * @override
     * @protected
     * @param {Input} input Input system
     * @param {GameScreen} screen Screen system
     * @param {Context} context Context to render
     * @param {SceneManager} manager Scene Manager
     * @param {Music} music Music system
     * @param {Timer} timer Timer
     * @return {Engine} Game engine
     */
    protected makeEngine(input: Input, screen: GameScreen, context: Context, manager: SceneManager, music: Music, timer: Timer): Engine {
        return new UnderEngine(input, screen, context, manager, music, timer);
    }

    /**
     * Make input system
     * @override
     * @protected
     * @param {GameScreen} screen Screen system
     * @return {Input} Input system
     */
    protected makeInput(screen: GameScreen): Input {
        return new AllInput(screen, new KeyInput(screen), new MouseInput(screen));
    }

    /**
     * Make screen system
     * @override
     * @protected
     * @return {GameScreen} Screen system
     */
    protected makeScreen(): GameScreen {
        return new ScalableScreen(new DetectiveScreen());
    }

    /**
     * Make context to render
     * @override
     * @protected
     * @param {GameScreen} screen Screen system
     * @param {IImageManager} image Imaga manager
     * @return {Context} Context to render
     */
    protected makeContext(screen: GameScreen, image: IImageManager): Context {
        return new JSContext(screen, image);
    }

    /**
     * Make image manager
     * @override
     * @protected
     * @return {IImageManager} Image manager
     */
    protected makeImageManager(): IImageManager {
        return new CachedImage(`src/res/image/`);
    }

    /**
     * Make music system
     * @override
     * @protected
     * @param {IMusicManager} music Music manager
     * @return {Music} Music system
     */
    protected makeMusic(music: IMusicManager): Music {
        return new BufferSourceMusic(music);
    }

    /**
     * Make music manager
     * @override
     * @protected
     * @return {IMusicManager} Music manager
     */
    protected makeMusicManager(): IMusicManager {
        return new CachedMusic(`src/res/sound/`);
    }

    /**
     * Make timer
     * @override
     * @protected
     * @return {Timer} Timer
     */
    protected makeTimer(): Timer {
        return new SimpleTimer();
    }

    /**
     * Make scene manager
     * @override
     * @protected
     * @return {SceneManager} Scene manager
     */
    protected makeSceneManager(): SceneManager {
        return new StackSceneManager();
    }
}
