/**
 * Default scene example
 * @classdesc Scene sample class
 */
class DefaultScene extends Scene {
    constructor() {
        super();
        this.r = 10;
        this.angle = 0;
    }

    update(dt) {
        // update circle angle and radius
        if (this.input.isMousePressed(this.input.M.LEFT)) {
            this.r += dt / 20;
            this.angle = this.angle + Math.PI / 10 * dt / 20;
        } else {
            this.r -= dt / 20;
            this.angle = this.angle + Math.PI / 30 * dt / 20;
        }
        this.r = this.r > 20 ? 20 : this.r < 10 ? 10 : this.r;
        if (this.angle > Math.PI * 2.5)
            this.angle -= Math.PI * 2.5;
    }

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
        let angle = this.angle > Math.PI * 2 ? Math.PI * 2 : this.angle;
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.arc(this.input.getMouseX(), this.input.getMouseY(), this.r, 0, angle, false);
        ctx.stroke();
    }
}