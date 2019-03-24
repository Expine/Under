import { BaseLayeredScene } from "../../under/extend/scene/BaseLayeredScene";
import { StageManager } from "../../under/base/stage/StageManager";
import { Stage } from "../../under/base/stage/Stage";
import { EventManager } from "../../under/base/event/EventManager";
import { IPlayable, isIPlayable } from "../../under/base/stage/entity/interface/IPlayable";
import { GameScreen } from "../../under/base/screen/GameScreen";
import { StackStageManager } from "../../under/extend/stage/StackStageManager";
import { SingleAnimation } from "../../under/extend/resources/image/SingleAnimation";
import { ResourceManager } from "../../under/base/resources/ResourceManager";
import { GameoverLayer } from "../../under/extend/scene/layer/GameoverLayer";
import { Input } from "../../under/base/input/Input";
import { SceneManager } from "../../under/base/scene/SceneManager";
import { TitleScene } from "./TitleScene";
import { Context } from "../../under/base/resources/image/Context";
import { UILayer } from "./layer/UILayer";
import { TileImage } from "../../under/extend/resources/image/TileImage";
import { WithBackgroundEventManager } from "../../under/extend/event/WithBackgroundEventManager";
import { isRespawnEntity } from "../../under/extend/stage/entity/respawn/RespawnEntity";
import { UnderStageParser } from "../stage/parser/UnderStageParser";

/**
 * Game Scene
 * - Render stage and control gameover
 * @extends {BaseLayeredScene}
 * @classdesc Game scene to render stage and control gameover
 */
export class GameScene extends BaseLayeredScene {
    /**
     * Game stage manager
     * @protected
     * @type {StageManager}
     */
    protected stageManager: StageManager | null;
    /**
     * Current stage instance
     * @protected
     * @type {Stage}
     */
    protected currentStage: Stage | null;

    /**
     * Event manager
     * @protected
     * @type {EventManager}
     */
    protected eventManager: EventManager | null;

    /**
     * Game player
     * @protected
     * @type {IPlayable}
     */
    protected player: IPlayable | null;

    /**
     * Whether the game is over
     * @protected
     * @type {boolean}
     */
    protected gameover: boolean;

    /**
     * Game scene
     */
    constructor() {
        super();

        this.stageManager = null;
        this.currentStage = null;
        this.eventManager = null;
        this.player = null;
        this.gameover = false;
    }

    /**
     * Initialize stage of game
     * @protected
     */
    initStage() {
        this.gameover = false;
        // set player
        if (this.stageManager !== null) {
            this.currentStage = this.stageManager.getStage();
        }
        if (this.currentStage !== null) {
            const player = this.currentStage.getEntitiesByInterface(isIPlayable).find((it) => !it.isGameover());
            this.player = player === undefined ? null : player;
        }

        // initialize ui layer
        const layers = this.getLayers();
        for (let i = layers.length - 1; i >= 0; --i) {
            this.removeLayer(layers[i]);
        }
        if (this.stageManager !== null) {
            const ui = new UILayer(this.stageManager);
            ui.setPosition(0, 0, 0);
            ui.setSize(GameScreen.it.width, GameScreen.it.height);
            this.addLayer(ui);
        }
    }

    /**
     * Initialize scene
     * @override
     */
    init() {
        this.stageManager = new StackStageManager();
        this.stageManager.setStageParser(new UnderStageParser());
        this.stageManager.setStageSize(GameScreen.it.width, GameScreen.it.height);
        this.stageManager.pushStage(`map1`);

        const eventImage = new SingleAnimation(true);
        const id = ResourceManager.image.load(`event/eventBack.png`);
        for (let i = 0; i < 4; ++i) {
            eventImage.addAnimation(new TileImage(id, GameScreen.it.width, GameScreen.it.height, i * 100, 0, 100, 75), 250);
        }
        this.eventManager = new WithBackgroundEventManager(eventImage);
        this.eventManager.init();

        // initialize stage
        this.initStage();
    }

    /**
     * Update scene
     * @override
     * @param {number} dt Delta time
     */
    update(dt: number) {
        // gameover
        if (this.player !== null && this.player.isGameover() && !this.gameover) {
            const layer = new GameoverLayer();
            layer.setPosition(0, 0, 1);
            layer.setSize(GameScreen.it.width, GameScreen.it.height);
            this.addLayer(layer);
            this.gameover = true;
        }

        if (this.stageManager !== null) {
            this.stageManager.update(dt);
        }
        super.update(dt);
        if (this.stageManager !== null) {
            // check transtion of stage
            if (this.stageManager.getStage() !== this.currentStage) {
                this.currentStage = this.stageManager.getStage();
                if (this.currentStage !== null) {
                    const player = this.currentStage.getEntitiesByInterface(isIPlayable).find((it) => !it.isGameover());
                    this.player = player === undefined ? null : player;
                }
            }
            // judge game over
            if (this.gameover) {
                // retry
                if (Input.key.isPress(Input.key.yes()) && this.currentStage !== null) {
                    // check respawn
                    for (const it of this.currentStage.getEntitiesByInterface(isRespawnEntity)) {
                        const entity = it.tryRespawn(dt);
                        if (isIPlayable(entity)) {
                            this.initStage();
                        } else if (entity !== null) {
                            this.currentStage.removeEntityImmediately(entity);
                        }
                    }
                } else if (Input.key.isPress(Input.key.no())) {
                    SceneManager.it.replaceScene(new TitleScene());
                }
            }
        }

        // update event
        if (this.eventManager !== null) {
            this.eventManager.update(dt);
        }
    }

    /**
     * Render scene
     * @override
     * @param {Context} ctx
     */
    render(ctx: Context) {
        if (this.stageManager !== null) {
            this.stageManager.render(ctx);
        }
        super.render(ctx);
        if (this.stageManager !== null && this.eventManager !== null) {
            this.eventManager.render(ctx);
        }
    }
}
