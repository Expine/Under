/**
 * Debug layer
 * - Performs drawing processing collectively
 * - ### Renders information necessary for debugging
 * @extends {Layer}
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
        this.playerCollisions = 0;

        /**
         * Stage instance
         * @protected
         * @type {Stage}
         */
        this.stage = stage;
        /**
         * Game player
         * @protected
         * @type {MutableEntity}
         */
        this.player = this.stage.getEntities().filter((it) => it instanceof MutableEntity && BaseUtil.implementsOf(it, IPlayable))[0];

        /**
         * Count for determinig information
         * @protected
         * @type {number}
         */
        this.count = 0;
        /**
         * Recode for registering information temporary
         * @protected
         * @type {Array<Object>}
         */
        this.record = [];
        for (var i = 0; i < 10; ++i) {
            this.record.push({});
        }
    }
    /**
     * Update layer
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        let it = this.record[this.count];
        it.deltaTime = Timer.it.deltaTime;
        it.collisions = this.stage.getPhysicalWorld().getCollisionSize();
        it.playerCollisions = this.player.collider.collisions.length;
        // check timer
        if (++this.count >= this.record.length) {
            // update all data
            this.deltaTime = 0;
            this.collisions = 0;
            this.playerCollisions = 0;
            for (let v of this.record) {
                this.deltaTime = Math.max(this.deltaTime, v.deltaTime);
                this.collisions = Math.max(this.collisions, v.collisions);
                this.playerCollisions = Math.max(this.playerCollisions, v.playerCollisions);
            }
            this.count = 0;
        }
    }

    /**
     * Render layer
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        // timer
        Timer.it.render(ctx, this.x, this.y);

        // TODO: May be create debug information data class
        ctx.fillText(`${this.deltaTime} msec`, this.width, this.y, 1.0, 0.0, 20, `white`);
        ctx.fillText(`${this.collisions} collision`, this.width, this.y + 30, 1.0, 0.0, 20, `white`);
        ctx.fillText(`${this.playerCollisions} P collision`, this.width, this.y + 60, 1.0, 0.0, 20, `white`);
        ctx.fillText(`${BaseUtil.getClassName(this.stage.getPhysicalWorld() instanceof DebugWorld ? this.stage.getPhysicalWorld().world : this.stage.getPhysicalWorld() )}-${BaseUtil.getClassName(this.stage.getPhysicalWorld().getResponse())}`, this.width, this.y + 90, 1.0, 0.0, 20, `white`);
        ctx.fillText(`(${Math.floor(this.player.x)}, ${Math.floor(this.player.y)})`, this.width, this.y + 120, 1.0, 0.0, 20, `white`);
        ctx.fillText(`(${Math.floor(this.player.body.velocityX)}, ${Math.floor(this.player.body.velocityY)})`, this.width, this.y + 150, 1.0, 0.0, 20, `white`);
        ctx.fillText(`(${Math.floor(this.player.body.accelerationX)},${Math.floor(this.player.body.accelerationY)})`, this.width, this.y + 180, 1.0, 0.0, 20, `white`);
        if (this.player.state != null) {
            ctx.fillText(BaseUtil.getClassName(this.player.state), this.width, this.y + 210, 1.0, 0.0, 20, `white`);
        }
        ctx.fillText(`M(${Math.floor(Input.mouse.getMouseX())},${Math.floor(Input.mouse.getMouseY())})`, this.width, this.y + 240, 1.0, 0.0, 20, `white`);
    }
}
