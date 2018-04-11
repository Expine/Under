/**
 * Default title scene
 * - Controls updating and rendering
 * - ### Default title scene example
 * - ### Sample of mouse processing, input processing and drawing processing
 * @implements {Scene}
 * @classdesc Default title scene indicating sample scene
 */
class DefaultTitleScene extends Scene { // eslint-disable-line  no-unused-vars
    /**
     * Default title scene constructor
     * @constructor
     */
    constructor() {
        super();
        /**
         * Circle radius
         * @private
         * @type {number}
         */
        this.r_ = 10;
        /**
         * Circle angle
         * @private
         * @type {number}
         */
        this.angle_ = 0;
    }

    /**
     * Update scene
     * @override
     * @param {number} dt - delta time
     */
    update(dt) {
        // update circle angle and radius
        if (Input.it.isMousePressed(Input.it.M.LEFT)) {
            this.r_ += dt / 20;
            this.angle_ = this.angle_ + Math.PI / 10 * dt / 20;
        } else {
            this.r_ -= dt / 20;
            this.angle_ = this.angle_ + Math.PI / 30 * dt / 20;
        }
        this.r_ = this.r_ > 20 ? 20 : this.r_ < 10 ? 10 : this.r_;
        if (this.angle_ > Math.PI * 2.5) {
            this.angle_ -= Math.PI * 2.5;
        }
    }

    /**
     * Render scene
     * @override
     * @param {Context} ctx
     */
    render(ctx) {
        // render sample text
        let sample = `Sample`;
        ctx.fillText(sample, 400, 300, 0.5);

        // render when enter pressed
        if (Input.it.isKeyPressed(13)) {
            ctx.fillText(`Enter pressed`, 400, 400, 0.5, 0, 30, `red`);
        }

        // render circle on mouse
        let angle = this.angle_ > Math.PI * 2 ? Math.PI * 2 : this.angle_;
        ctx.strokeCircle(Input.it.getMouseX(), Input.it.getMouseY(), this.r_, 0, angle, false);
    }
}
