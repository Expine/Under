/**
 * UI layer
 * - Performs drawing processing collectively
 * - ### Display UI
 * @implements {Layer}
 * @classdesc UI layer to display UI
 */
class UILayer extends Layer { // eslint-disable-line  no-unused-vars
    /**
     * UI layer constructor
     * @constructor
     * @param {Player} player Player instance
     */
    constructor(player) {
        super();
        /**
         * Player instance
         * @protected
         * @type {Player}
         */
        this.player = player;
        /**
         * Player hit point
         * @protected
         * @type {number}
         */
        this.playerHP = player.getHP();

        // Load UI image
        /**
         * UI Image
         * @protected
         * @type {MultiNamedAnimation}
         */
        this.uiAnimation = new MultiNamedAnimation();
        let uiImage = ResourceManager.image.load(`ui/hp.png`);
        for (let i = 0; i < 6; ++i) {
            this.uiAnimation.setName(`${3 - (Math.floor(i / 2) % 4)}-${3 - (Math.floor((i + 1) / 2) % 4)}`).setAnimation(new SingleAnimation());
            this.uiAnimation.setLoop(i % 2 == 0);
            if (i != 5) {
                for (let j = 0; j < 4; ++j) {
                    this.uiAnimation.addAnimation(new AnimationElement(uiImage, 32 * j, 32 * i, 32, 32, i % 2 == 0 ? 300 : 200));
                }
            } else {
                for (let j = 0; j < 8; ++j) {
                    this.uiAnimation.addAnimation(new AnimationElement(uiImage, 32 * (j % 4), 32 * (i + Math.floor(j / 4)), 32, 32, 200));
                }
            }
        }
        this.uiAnimation.setName(`${this.player.getHP()}-${this.player.getHP()}`);
    }
    /**
     * Update layer
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        // Check hp change
        let diff = this.playerHP - this.player.getHP();
        if (diff != 0 && (this.uiAnimation.isEnded() || this.uiAnimation.isLoop())) {
            this.uiAnimation.setName(`${this.playerHP}-${this.playerHP - Math.sign(diff)}`);
            this.uiAnimation.init();
            this.playerHP = this.playerHP - Math.sign(diff);
        } else if (this.playerHP > 0 && diff == 0 && (this.uiAnimation.isEnded() && !this.uiAnimation.isLoop())) {
            this.uiAnimation.setName(`${this.playerHP}-${this.playerHP}`);
            this.uiAnimation.init();
        }
        // animation
        this.animationCount += dt;
        this.uiAnimation.update(dt);
    }

    /**
     * Render layer
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        this.uiAnimation.render(ctx, 10, 530, 64, 64);
    }
}
