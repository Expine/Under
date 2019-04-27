import { Layer } from "../../../under/base/scene/layer/Layer";
import { StageManager } from "../../../under/base/stage/StageManager";
import { Stage } from "../../../under/base/stage/Stage";
import { IDamagable, isIDamagable } from "../../../under/base/stage/entity/interface/IDamagable";
import { NamedAnimation } from "../../../under/base/resources/image/NamedAnimation";
import { MultiNamedAnimation } from "../../../under/extend/resources/image/MultiNamedAnimation";
import { isIPlayable } from "../../../under/base/stage/entity/interface/IPlayable";
import { ResourceManager } from "../../../under/base/resources/ResourceManager";
import { SingleAnimation } from "../../../under/extend/resources/image/SingleAnimation";
import { TileImage } from "../../../under/extend/resources/image/TileImage";
import { Context } from "../../../under/base/resources/image/Context";

/**
 * UI layer
 * - Display UI
 * @extends {Layer}
 * @classdesc UI layer to display UI
 */
export class UILayer extends Layer {
    /**
     * Stage instance
     * @protected
     * @type {StageManager}
     */
    protected stage: StageManager;
    /**
     * Current stage
     * @protected
     * @type {Stage}
     */
    protected currentStage: Stage | null;
    /**
     * Damagable player instance
     * @protected
     * @type {IDamagable}
     */
    protected player: IDamagable | null;
    /**
     * Player hit point
     * @protected
     * @type {number}
     */
    protected playerHP: number;

    /**
     * UI Image
     * @protected
     * @type {NamedAnimation}
     */
    protected uiAnimation: NamedAnimation;

    /**
     * UI layer constructor
     * @constructor
     * @param {StageManager} stage Stage manager instance
     */
    constructor(stage: StageManager) {
        super();
        this.stage = stage;
        this.currentStage = null;
        this.player = null;
        this.playerHP = 0;
        this.uiAnimation = new MultiNamedAnimation();
    }

    /**
     * Initialize scene
     * @override
     */
    init() {
        this.currentStage = this.stage.getStage();
        // find player
        if (this.currentStage !== null) {
            for (const it of this.currentStage.getEntitiesByInterface(isIPlayable)) {
                if (isIDamagable(it)) {
                    this.player = it;
                    this.playerHP = this.player.getHP();
                }
            }
        }
        if (this.player === null) {
            return;
        }

        // load animation
        const uiImage = ResourceManager.image.load('ui/hp.png');
        for (let i = 0; i < 6; ++i) {
            this.uiAnimation.setName(`${3 - (Math.floor(i / 2) % 4)}-${3 - (Math.floor((i + 1) / 2) % 4)}`);
            this.uiAnimation.setAnimation(new SingleAnimation(i % 2 === 0));
            if (i !== 5) {
                for (let j = 0; j < 4; ++j) {
                    this.uiAnimation.addAnimation(new TileImage(uiImage, 64, 64, 32 * j, 32 * i, 32, 32), i % 2 === 0 ? 300 : 200);
                }
            } else {
                for (let j = 0; j < 8; ++j) {
                    this.uiAnimation.addAnimation(new TileImage(uiImage, 64, 64, 32 * (j % 4), 32 * (i + Math.floor(j / 4)), 32, 32), 200);
                }
            }
        }
        this.uiAnimation.setName(`${this.player.getHP()}-${this.player.getHP()}`);
        this.uiAnimation.init();
    }

    /**
     * Update layer
     * @override
     * @param {number} dt Delta time
     */
    update(dt: number) {
        // check stage transition
        if (this.currentStage !== this.stage.getStage()) {
            this.currentStage = this.stage.getStage();
            // find player
            if (this.currentStage !== null) {
                for (const it of this.currentStage.getEntitiesByInterface(isIPlayable)) {
                    if (isIDamagable(it)) {
                        this.player = it;
                    }
                }
            }
        }
        if (this.player === null) {
            return;
        }
        // Check hp change
        const diff = this.playerHP - this.player.getHP();
        if (diff !== 0 && (this.uiAnimation.isEnded() || this.uiAnimation.isLoop())) {
            // decreasing animation
            this.uiAnimation.setName(`${this.playerHP}-${this.playerHP - Math.sign(diff)}`);
            this.uiAnimation.init();
            this.playerHP = this.playerHP - Math.sign(diff);
        } else if (this.playerHP > 0 && diff === 0 && (this.uiAnimation.isEnded() && !this.uiAnimation.isLoop())) {
            // transition to normal animation
            this.uiAnimation.setName(`${this.playerHP}-${this.playerHP}`);
            this.uiAnimation.init();
        }
        // animation
        this.uiAnimation.update(dt);
    }

    /**
     * Render layer
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx: Context) {
        this.uiAnimation.render(ctx, this.x + 10, this.y + 530);
    }
}
