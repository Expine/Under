import { Engine } from "../base/Engine";
import { Input } from "../base/input/Input";
import { GameScreen } from "../base/screen/GameScreen";
import { Context } from "../base/resources/image/Context";
import { SceneManager } from "../base/scene/SceneManager";
import { Music } from "../base/resources/music/Music";
import { Timer } from "../base/timer/Timer";

/**
 * Under engine
 * - Executes the main loop by requestAnimationFrame
 * @extends {Engine}
 * @classdesc Under engine to execute main loop by requestAnimationFrame
 */
export class UnderEngine extends Engine {
    /**
     * Previous measurement time
     * @protected
     * @type {number}
     */
    protected oldTime: number;

    /**
     * Rendering lambda function
     * @private
     * @type {lambda}
     */
    protected _loop: FrameRequestCallback;

    /**
     * Under engine constructor
     * @constructor
     * @param {Input} input Input system
     * @param {GameScreen} screen Screen system
     * @param {Context} context Context to render
     * @param {SceneManager} manager Scene Manager
     * @param {Music} music Music system
     * @param {Timer} timer Timer
     */
    constructor(input: Input, screen: GameScreen, context: Context, manager: SceneManager, music: Music, timer: Timer) {
        super(input, screen, context, manager, music, timer);
        this.oldTime = +new Date();
        // set main loop
        this._loop = (_) => {
            requestAnimationFrame(this._loop);
            this.update();
            this.render();
        };
    }

    /**
     * Update in main loop
     * @protected
     */
    update() {
        const newTime = +new Date();
        this.timer.update(newTime - this.oldTime);
        this.input.update();
        // minimum delta time is 30 milisec
        this.manager.update(this.timer.getDeltatime() > 30 ? 30 : this.timer.getDeltatime());
        this.oldTime = newTime;
    }

    /**
     * Rendering in main loop
     * @protected
     */
    render() {
        this.context.preRendering();
        this.manager.render(this.context);
        this.context.postRendering();
    }

    /**
     * Game main process
     * @override
     * @protected
     */
    main() {
        // start main loop
        this.oldTime = +new Date();
        requestAnimationFrame(this._loop);
    }
}
