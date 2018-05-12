// TODO: Comment
/**
 * Gravity world
 * - Performs a physical operation
 * - Registers entities and apply a physical operation
 * - Continually perform collision processing
 * - ### Manages not actor by split area
 * @extends {SplitWorld}
 * @classdesc Gravity world to manage not actor by split area
 */
class VariableGravityWorld extends SplitWorld { // eslint-disable-line  no-unused-vars
    /**
     * Gravity world constructor
     * @constructor
     * @param {number} stageWidth Stage width (pixel)
     * @param {number} stageHeight Stage height (pixel)
     * @param {number} [gravity=9.8] gravity of the world
     */
    constructor(stageWidth, stageHeight, gravity = 9.8) {
        super(stageWidth, stageHeight, gravity);

        /**
         * Gravity x direction
         * @protected
         * @param {number}
         */
        this.gravityX = 0;
        /**
         * Gravity y direction
         * @protected
         * @param {number}
         */
        this.gravityY = 1;

        this.gravityXs = [];
        this.gravityYs = [];
        this.deltas = [];

        this.number = 0;
    }

    /**
     * Add gravity change time
     * @param {number} gravityX Gravity x direction
     * @param {number} gravityY Gravity y direction
     * @param {number} delta Delta time
     */
    addGravity(gravityX, gravityY, delta) {
        this.gravityXs.push(gravityX);
        this.gravityYs.push(gravityY);
        this.deltas.push(delta);
    }

    /**
     * Update external force
     * @protected
     * @override
     * @param {number} dt Delta time
     */
    updateExternalForce(dt) {
        if (this.deltas[this.number] < 0) {
            this.number++;
        }
        if (this.number < this.deltas.length) {
            this.gravityX = this.gravityXs[this.number];
            this.gravityY = this.gravityYs[this.number];
            this.deltas[this.number] -= dt / 1000;
            if (this.deltas[this.number] < 1) {
                this.gravityX = 0;
                this.gravityY = 1;
            }
        }

        for (let target of this.actors) {
            if (target.body !== null) {
                let g = this.gravity * target.material.mass * target.body.material.gravityScale;
                target.body.enforce(g * this.gravityX, g * this.gravityY);
            }
        }
    }

    /**
     * Render world
     * @abstract
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        if (this.number < this.deltas.length) {
            let delta = this.deltas[this.number];
            if (delta < 1 && Math.floor(delta * 1000) % 2 == 0) {
                if (this.number < this.deltas.length - 1) {
                    let x = this.gravityXs[this.number + 1];
                    let y = this.gravityYs[this.number + 1];
                    if (x > 0) {
                        ctx.fillText(`>`, GameScreen.it.width - 10, GameScreen.it.height / 2, 1.0, 0.5, 100, `red`);
                    }
                    if (x < 0) {
                        ctx.fillText(`<`, 10, GameScreen.it.height / 2, 0.0, 0.5, 100, `red`);
                    }
                    if (y > 0) {
                        ctx.fillText(`|`, GameScreen.it.width / 2, GameScreen.it.height - 10, 0.5, 1.0, 100, `red`);
                    }
                    if (y < 0) {
                        ctx.fillText(`^`, GameScreen.it.width / 2, 10, 0.5, 0.0, 100, `red`);
                    }
                }
            }
        }
    }
}
