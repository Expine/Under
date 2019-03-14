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
 * Engine builder
 * - Performs initial construction of the game engine
 * @abstract
 * @classdesc Engine builder to perform initial construction of the game engine
 */
export abstract class EngineBuilder {
    /**
     * Make game engine
     * @abstract
     * @protected
     * @param {Input} input Input system
     * @param {GameScreen} screen Screen system
     * @param {Context} context Context to render
     * @param {SceneManager} manager Scene Manager
     * @param {Music} music Music system
     * @param {Timer} timer Timer
     * @return {Engine} Game engine
     */
    abstract makeEngine(input: Input, screen: GameScreen, context: Context, manager: SceneManager, music: Music, timer: Timer): Engine;

    /**
     * Make input system
     * @abstract
     * @protected
     * @param {GameScreen} screen Screen system
     * @return {Input} Input system
     */
    abstract makeInput(screen: GameScreen): Input;

    /**
     * Make screen system
     * @abstract
     * @protected
     * @return {GameScreen} Screen system
     */
    abstract makeScreen(): GameScreen;

    /**
     * Make context to render
     * @abstract
     * @protected
     * @param {GameScreen} screen Screen system
     * @param {IImageManager} image Imaga manager
     * @return {Context} Context to render
     */
    abstract makeContext(screen: GameScreen, image: IImageManager): Context;

    /**
     * Make image manager
     * @abstract
     * @protected
     * @return {IImageManager} Image manager
     */
    abstract makeImageManager(): IImageManager;

    /**
     * Make music system
     * @abstract
     * @protected
     * @param {IMusicManager} music Music manager
     * @return {Music} Music system
     */
    abstract makeMusic(music: IMusicManager): Music;

    /**
     * Make music manager
     * @abstract
     * @protected
     * @return {IMusicManager} Music manager
     */
    abstract makeMusicManager(): IMusicManager;

    /**
     * Make timer
     * @abstract
     * @protected
     * @return {Timer} Timer
     */
    abstract makeTimer(): Timer;

    /**
     * Make scene manager
     * @abstract
     * @protected
     * @return {SceneManager} Scene manager
     */
    abstract makeSceneManager(): SceneManager;

    /**
     * Perform initial construction of the game engine
     * @return {Engine} Game engine
     */
    build(): Engine {
        const screen = this.makeScreen();
        return this.makeEngine(this.makeInput(screen), screen, this.makeContext(screen, this.makeImageManager()), this.makeSceneManager(), this.makeMusic(this.makeMusicManager()), this.makeTimer());
    }
}
