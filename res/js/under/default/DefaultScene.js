/**
 * Default scene example
 * Implement scene method
 * @classdesc Scene sample class
 * @implements {Scene}
 */
class DefaultScene extends Scene {
    /**
     * Constructor for default scene
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
        if (this.input.isMousePressed(this.input.M.LEFT)) {
            this.r_ += dt / 20;
            this.angle_ = this.angle_ + Math.PI / 10 * dt / 20;
        } else {
            this.r_ -= dt / 20;
            this.angle_ = this.angle_ + Math.PI / 30 * dt / 20;
        }
        this.r_ = this.r_ > 20 ? 20 : this.r_ < 10 ? 10 : this.r_;
        if (this.angle_ > Math.PI * 2.5)
            this.angle_ -= Math.PI * 2.5;
    }

    /**
     * Render scene
     * @override
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx) {
        // render sample text
        let sample = "Sample";
        ctx.fillStyle = "white";
        ctx.font = "50px Arial";
        ctx.fillText(sample, 400 - ctx.measureText(sample).width / 2, 300);

        // render when enter pressed
        ctx.font = "30px Arial";
        if (this.input.isKeyPressed(13))
            ctx.fillText("Enter pressed", 400 - ctx.measureText("Enter pressed").width / 2, 400);

        // render circle on mouse
        let angle = this.angle_ > Math.PI * 2 ? Math.PI * 2 : this.angle_;
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.arc(this.input.getMouseX(), this.input.getMouseY(), this.r_, 0, angle, false);
        ctx.stroke();
        ctx.closePath();
    }
}