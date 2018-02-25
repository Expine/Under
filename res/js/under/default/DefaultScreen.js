/**
 * Default screen example
 * Implement screen method
 * @implements {Screen}
 * @classdesc Screen sample class
 */
class DefaultScreen extends Screen {
    /**
     * Screen constructor
     * @constructor
     * @param {number} [width = 800]  screen width
     * @param {number} [height = 600]  screen height
     */
    constructor(width = 800, height = 600) {
        super(width, height);
    }

    /**
     * Set canvas
     * @param {Canvas} canvas target canvas
     */
    setCanvas(canvas) {
        /**
         * Game canvas
         * @protected
         * @type {Canvas}
         */
        this.canvas = canvas;

        // generate style
        let style = document.createElement("style");
        style.append("canvas {display:block;width: " + this.width + "px;height: " + this.height + "px;margin: 0px auto;}");
        document.head.appendChild(style);

        // set canvas default size
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.setAttribute("style", "canvas");

        // resize
        (window.onresize = () => {
            /*
            this.gameSize = Math.min((innerWidth - 16) / this.width, (innerHeight - 16) / this.height);
            this.canvas.width = this.gameSize * this.width;
            this.canvas.style.width = this.canvas.width + "px";
            this.canvas.height = this.gameSize * this.height;
            this.canvas.style.height = this.canvas.height + "px";
            */
        })();
    }
}