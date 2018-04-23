/**
 * Debug layer
 * - Performs drawing processing collectively
 * - ### Renders information necessary for debugging
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

        /**
         * Timers for registering time
         * @protected
         * @type {Object<string, Array<number>>}
         */
        this.timers = {};

        /**
         * Timer values
         * @protected
         * @type {Object<string, number>}
         */
        this.timerVals = {};
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
        for (let name of Timer.it.getRegisteredNames()) {
            let time = Timer.it.getTimer(name);
            if (this.timers[name] === undefined) {
                this.timers[name] = [];
            }
            this.timers[name].push(time);
        }
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
            for (let name of Timer.it.getRegisteredNames()) {
                this.timerVals[name] = 0;
                for (let time of this.timers[name]) {
                    this.timerVals[name] = Math.max(this.timerVals[name], time);
                }
                this.timers[name].length = 0;
            }
        }
    }

    /**
     * Render layer
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        // timer
        {
            let x = 0;
            let y = 0;
            for (let name in this.timerVals) {
                if (this.timerVals.hasOwnProperty(name)) {
                    ctx.fillText(`${name} : ${this.timerVals[name]} msec`, x, y, 0.0, 0.0, 20, `white`);
                    y += 30;
                }
            }
        }

        // TODO: May be create debug information data class
        ctx.fillText(`${this.deltaTime} msec`, Screen.it.width, 0, 1.0, 0.0, 20, `white`);
        ctx.fillText(`${this.collisions} collision`, Screen.it.width, 30, 1.0, 0.0, 20, `white`);
        ctx.fillText(`${this.playerCollisions} P collision`, Screen.it.width, 60, 1.0, 0.0, 20, `white`);
        ctx.fillText(`${BaseUtil.getClassName(this.stage.getPhysicalWorld() instanceof DebugWorld ? this.stage.getPhysicalWorld().world : this.stage.getPhysicalWorld() )}-${BaseUtil.getClassName(this.stage.getPhysicalWorld().getResponse())}`, Screen.it.width, 90, 1.0, 0.0, 20, `white`);
        ctx.fillText(`(${Math.floor(this.player.x)}, ${Math.floor(this.player.y)})`, Screen.it.width, 120, 1.0, 0.0, 20, `white`);
        ctx.fillText(`(${Math.floor(this.player.body.velocityX)}, ${Math.floor(this.player.body.velocityY)})`, Screen.it.width, 150, 1.0, 0.0, 20, `white`);
        ctx.fillText(`(${Math.floor(this.player.body.accelerationX)},${Math.floor(this.player.body.accelerationY)})`, Screen.it.width, 180, 1.0, 0.0, 20, `white`);
        if (this.player.state != null) {
            ctx.fillText(BaseUtil.getClassName(this.player.state), Screen.it.width, 210, 1.0, 0.0, 20, `white`);
        }
    }
}
