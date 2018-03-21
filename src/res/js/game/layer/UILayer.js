/**
 * UI layer
 * Display UI
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

        /**
         * Animation count
         * @protected
         * @type {number}
         */
        this.animationCount = 0;
        /**
         * Threshold to next transition
         * @protected
         * @type {number}
         */
        this.animationFrame = 200;
        /**
         * Animation state
         * @protected
         * @type {number}
         */
        this.animationState = (3 - this.playerHP) * 2;

        // Load UI image
        /**
         * UI Image
         * @protected
         * @type {SingleAnimation}
         */
        this.uiImage = ContextImage.it.loadImage(`res/image/ui/hp.png`);
        this.uiAnimation = new SingleAnimation();
        for (let i = 0; i < 4; ++i) {
            this.uiAnimation.addAnimatiion(new AnimationElement(this.uiImage, 32 * i, 0, 32, 32, 200));
        }
    }
    /**
     * Update layer
     * @override
     * @param {number} dt - delta time
     */
    update(dt) {
        // animation
        this.animationCount += dt;
        this.uiAnimation.update(dt);
        // Check hp change
        let diff = this.playerHP - this.player.getHP();
        if (diff != 0) {
            this.animationCount = 0;
            this.animationFrame = 200;
            this.playerHP = this.player.getHP();
            this.animationState += this.animationState % 2 == 0 ? 1 : 2;
        }
        if (this.animationState % 2 != 0 && this.animationCount / this.animationFrame >= 4) {
            this.animationCount = 0;
            this.animationFrame = 300;
            this.animationState += 1;
        }
        if (this.animationState == 6 && this.animationCount / this.animationFrame >= 4) {
            this.animationCount = this.animationFrame * 4 - 1;
        }
    }

    /**
     * Render layer
     * @override
     * @param {Context} ctx
     */
    render(ctx) {
        //        ctx.drawImage(this.uiImage, 10, 530, 64, 64, (Math.floor(this.animationCount / this.animationFrame) % 4) * 32, this.animationState * 32, 32, 32);
        this.uiAnimation.render(ctx, 10, 530, 64, 64);
    }
}
