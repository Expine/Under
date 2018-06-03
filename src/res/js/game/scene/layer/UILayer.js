/**
 * UI layer
 * - Performs drawing processing collectively
 * - ### Display UI
 * @extends {Layer}
 * @classdesc UI layer to display UI
 */
class UILayer extends Layer { // eslint-disable-line  no-unused-vars
    /**
     * UI layer constructor
     * @constructor
     * @param {StageManager} stage Stage manager instance
     */
    constructor(stage) {
        super();
        /**
         * Stage instance
         * @protected
         * @type {StageManager}
         */
        this.stage = stage;
        /**
         * Current stage
         * @protected
         * @type {Stage}
         */
        this.currentStage = null;
        /**
         * Damagable player instance
         * @protected
         * @type {IDamagable}
         */
        this.player = null;
        /**
         * Player hit point
         * @protected
         * @type {number}
         */
        this.playerHP = 0;

        /**
         * UI Image
         * @protected
         * @type {NamedAnimation}
         */
        this.uiAnimation = new MultiNamedAnimation();
    }

    /**
     * Initialize scene
     * @override
     */
    init() {
        this.currentStage = this.stage.getStage();
        // find player
        for (const it of this.currentStage.getEntitiesByInterface(IPlayable)) {
            if (BaseUtil.implementsOf(it, IDamagable)) {
                this.player = it;
            }
        }

        this.playerHP = this.player.getHP();

        // load animation
        const uiImage = ResourceManager.image.load(`ui/hp.png`);
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
    update(dt) {
        // check stage transition
        if (this.currentStage !== this.stage.getStage()) {
            this.currentStage = this.stage.getStage();
            // find player
            for (const it of this.currentStage.getEntitiesByInterface(IPlayable)) {
                if (BaseUtil.implementsOf(it, IDamagable)) {
                    this.player = it;
                }
            }
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
    render(ctx) {
        this.uiAnimation.render(ctx, this.x + 10, this.y + 530);
    }
}
