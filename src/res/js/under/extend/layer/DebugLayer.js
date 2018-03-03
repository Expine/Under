/**
 * Debug layer
 * Renders information necessary for debugging
 * @classdesc Debug layer to render information necessary for debugging
 */
class DebugLayer extends Layer { // eslint-disable-line  no-unused-vars
    /**
     * Debug layer constructor
     * @param {Stage} stage Stage instance
     */
    constructor(stage) {
        super();
        /**
         * Delta time for rendering
         * @type {number}
         */
        this.deltaTime = 0;
        this.stage = stage;

        this.count = 0;
        this.record = [];
        for (var i = 0; i < 10; ++i) {
            this.record.push({});
        }
    }
    /**
     * Update layer
     * @interface
     * @param {number} dt - delta time
     */
    update(dt) {
        let it = this.record[this.count];
        it.deltaTime = dt;
        it.collisions = this.stage.physic.collisionSize;
        this.count += 1;
        if (this.count > 9) {
            this.deltaTime = 0;
            this.collisions = 0;
            for (let v of this.record) {
                this.deltaTime = Math.max(this.deltaTime, v.deltaTime);
                this.collisions = Math.max(this.collisions, v.collisions);
            }
            this.count = 0;
        }
    }

    /**
     * Render layer
     * @interface
     * @param {Context} ctx
     */
    render(ctx) {
        ctx.fillText(this.deltaTime + ` msec`, Screen.it.width, 0, 1.0, 0.0, 20, `white`);
        ctx.fillText(this.collisions + ` loop`, Screen.it.width, 30, 1.0, 0.0, 20, `white`);
    }
}
