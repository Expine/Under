/**
 * Debug layer
 * Renders information necessary for debugging
 * @implements {Layer}
 * @classdesc Debug layer to render information necessary for debugging
 */
class DebugLayer extends Layer { // eslint-disable-line  no-unused-vars
    /**
     * Debug layer constructor
     * @constructor
     * @param {Stage} stage Stage instance
     */
    constructor(stage) {
        super();

        /**
         * Delta time for rendering
         * @protected
         * @type {number}
         */
        this.deltaTime = 0;
        /**
         * Number of collisions
         * @protected
         * @type {number}
         */
        this.collisions = 0;
        /**
         * Number of player collisions
         * @protected
         * @type {number}
         */
        this.player = 0;

        /**
         * Stage instance
         * @protected
         * @type {Stage}
         */
        this.stage = stage;

        /**
         * Count for determinig information
         * @protected
         * @type {number}
         */
        this.count = 0;
        /**
         * Recode for registering information temporary
         * @protected
         * @type {Array<<Object>}
         */
        this.record = [];
        for (var i = 0; i < 10; ++i) {
            this.record.push({});
        }
    }
    /**
     * Update layer
     * @override
     * @param {number} dt - delta time
     */
    update(dt) {
        let it = this.record[this.count];
        it.deltaTime = window.deltaTime;
        it.collisions = this.stage.physic.collisionSize;
        it.player = this.stage.player_.collider.collisions.length;
        this.count += 1;
        if (this.count > 9) {
            this.deltaTime = 0;
            this.collisions = 0;
            this.player = 0;
            for (let v of this.record) {
                this.deltaTime = Math.max(this.deltaTime, v.deltaTime);
                this.collisions = Math.max(this.collisions, v.collisions);
                this.player = Math.max(this.player, v.player);
            }
            this.count = 0;
        }
    }

    /**
     * Render layer
     * @override
     * @param {Context} ctx
     */
    render(ctx) {
        ctx.fillText(`${this.deltaTime} msec`, Screen.it.width, 0, 1.0, 0.0, 20, `white`);
        ctx.fillText(`${this.collisions} collision`, Screen.it.width, 30, 1.0, 0.0, 20, `white`);
        ctx.fillText(`${this.player} P collision`, Screen.it.width, 60, 1.0, 0.0, 20, `white`);
        ctx.fillText(`${this.stage.physic.response instanceof ImpulseBasedResponse ? 'Impluse' : `Repulsion`}`, Screen.it.width, 90, 1.0, 0.0, 20, `white`);
        ctx.fillText(`(${Math.floor(this.stage.player_.x)}, ${Math.floor(this.stage.player_.y)})(${Math.floor(this.stage.player_.body.velocityX)}, ${Math.floor(this.stage.player_.body.velocityY)})(${Math.floor(this.stage.player_.body.preVelocityX)},${Math.floor(this.stage.player_.body.preVelocityY)})`, Screen.it.width, 120, 1.0, 0.0, 20, `white`);
        if (this.stage.player_.state != null) {
            ctx.fillText(this.stage.player_.state.constructor.toString().split(`\n`)[0].split(` `)[1], Screen.it.width, 150, 1.0, 0.0, 20, `white`);
        }
    }
}
