/**
 * Under engine
 * @classdesc Under engine main class
 * @sample
 * let engine = new UnderEngine("relative/path");
 * engine.setInput(new DefaultInput());
 * engine.execute(new DefaultScene());
 */
class UnderEngine {
    /**
     * Under engine constructor
     * @constructor
     * @param {string} root - under engine root path
     * @param {number} [width = 800] - screen width
     * @param {number} [height = 600] - screen height
     */
    constructor(root, width = 800, height = 600) {
        // set base data
        this.gameSize = 1;
        this.width = width;
        this.height = height;

        // generate style
        let style = document.createElement("style");
        style.append("canvas {display:block;width: " + width + "px;height: " + height + "px;margin: 0px auto;}");
        document.head.appendChild(style);

        // generate canvas
        this.canvas = document.createElement("canvas");
        this.canvas.id = "UnderCanvas";
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.setAttribute("style", "canvas");

        // set canvas
        let div = document.createElement("div");
        div.setAttribute("tabindex", "1");
        div.setAttribute("id", "UnderCanvasDiv");
        div.appendChild(this.canvas);
        document.body.appendChild(div);
        this.ctx = this.canvas.getContext("2d");

    }

    /**
     * Execute engine
     * @param {Scene} scene - Init scene
     */
    execute(scene) {
        this.transition(scene);
        this.oldTime = +new Date();

        this.render = _ => {
            requestAnimationFrame(this.render);
            // update
            let newTime = +new Date();
            this.input.update();
            this.scene.update(newTime - this.oldTime);
            this.oldTime = newTime;
            // draw
            this.ctx.save();
            this.ctx.scale(this.gameSize, this.gameSize);
            this.ctx.fillStyle = "black";
            this.ctx.fillRect(0, 0, this.width, this.height);
            this.scene.render(this.ctx);
            this.ctx.restore();
        };
        requestAnimationFrame(this.render);

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

    /**
     * Transition scene
     * @param {Scene} scene - scene for transition
     */
    transition(scene) {
        this.scene = scene;
        scene.setInput(this.input);
    }

    /**
     * Set input system
     * @param {Input} input - input system
     */
    setInput(input) {
        this.input = input;
        input.setTarget(this.canvas);
    }
}