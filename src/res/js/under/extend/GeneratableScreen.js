/**
 * Screen manager that can generate a canvas automatically
 * If the canvas does not exist, it is generated
 * @implements {Screen}
 * @classdesc Screen manager to generate  a canvas automatically
 * @example
 * let engine = new UnderEngine(`relative/path`);
 * engine.setScreen(new GeneratableScreen());
 */
class GeneratableScreen extends Screen { // eslint-disable-line  no-unused-vars
    /**
     * Generatable screen constructor
     * @constructor
     * @param {number} [width = 800]  screen width
     * @param {number} [height = 600]  screen height
     */
    constructor(width = 800, height = 600) {
        super(width, height);

        /**
         * Game canvas
         * @private
         * @type {Canvas}
         */
        this.canvas_;
        if (document.querySelector(`canvas`) == null) {
            // generate canvas
            this.canvas_ = document.createElement(`canvas`);
            // set canvas
            let div = document.createElement(`div`);
            div.setAttribute(`tabindex`, `1`);
            div.setAttribute(`id`, `UnderCanvasDiv`);
            div.appendChild(this.canvas_);
            document.body.appendChild(div);
        } else {
            this.canvas_ = document.querySelector(`canvas`);
        }

        // generate style
        let style = document.createElement(`style`);
        style.append(`canvas {display:block;width: ` + this.width + `px;height: ` + this.height + `px;margin: 0px auto;}`);
        document.head.appendChild(style);

        // set canvas default size
        this.canvas_.width = this.width;
        this.canvas_.height = this.height;
        this.canvas_.setAttribute(`style`, `canvas`);

        // resize
        (window.onresize = () => {
            this.gameSize = Math.min((innerWidth - 16) / this.width, (innerHeight - 16) / this.height);
            this.canvas_.width = this.gameSize * this.width;
            this.canvas_.style.width = this.canvas_.width + `px`;
            this.canvas_.height = this.gameSize * this.height;
            this.canvas_.style.height = this.canvas_.height + `px`;
            let ctx = this.canvas_.getContext(`2d`);
            ctx.mozImageSmoothingEnabled = false;
            ctx.webkitImageSmoothingEnabled = false;
            ctx.msImageSmoothingEnabled = false;
            ctx.imageSmoothingEnabled = false;
        })();
    }

    /**
     * Get input target element
     * @return {Element} input target element
     */
    getTarget() {
        return this.canvas_;
    }

    /**
     * Get canvas for rendering
     * @return {Canvas} Canvas
     */
    getCanvas() {
        return this.canvas_;
    }
}
