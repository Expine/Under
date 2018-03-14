/**
 * UI layer
 * Display UI
 * @classdesc UI layer to display UI
 */
class UILayer extends Layer { // eslint-disable-line  no-unused-vars
    /**
     * UI layer constructor
     * @param {Player} player Player instance
     */
    constructor(player) {
        super();
        /**
         * Player instance
         * @type {Player}
         */
        this.player = player;
        /**
         * Player hit point
         * @type {number}
         */
        this.playerHP = player.getHP();

        /**
         * Animation count
         * @type {number}
         */
        this.animationCount = 0;
        /**
         * Threshold to next transition
         * @type {number}
         */
        this.animationFrame = 200;
        /**
         * Animation state
         * @type {number}
         */
        this.animationState = (3 - this.playerHP) * 2;

        // Load UI image
        /**
         * UI Image
         * @type {number}
         */
        this.uiImage = Context.image.loadImage(`res/image/ui/hp.png`);
    }
    /**
     * Update layer
     * @interface
     * @param {number} dt - delta time
     */
    update(dt) {
        // animation
        this.animationCount += dt;
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
     * @interface
     * @param {Context} ctx
     */
    render(ctx) {
        ctx.drawImage(this.uiImage, (Math.floor(this.animationCount / this.animationFrame) % 4) * 32, this.animationState * 32, 32, 32, 10, 530, 64, 64);
    }
}
