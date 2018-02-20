/**
 * Under engine
 * @classdesc Under engine
 * @example
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
        this.source = new SourceManager(root);
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

        this.source.addSources();
    }

    /**
     * Execute engine
     * @param {Scene} scene - Init scene
     */
    execute(scene) {
        this.scene = scene;
        this.oldTime = +new Date();
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");

        this.render = _ => {
            requestAnimationFrame(this.render);
            // update
            let newTime = +new Date();
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
            this.gameSize = Math.min((innerWidth - 16) / this.width, (innerHeight - 16) / this.height);
            this.canvas.width = this.gameSize * this.width;
            this.canvas.style.width = this.canvas.width + "px";
            this.canvas.height = this.gameSize * this.height;
            this.canvas.style.height = this.canvas.height + "px";
        })();
    }
}

class SourceManager {
    constructor(root) {
        this.root = root;
    }

    /**
     * Add under engine source file
     * @param {string} path - relative source file path
     */
    addUnderSource(path) {
        this.addSource('under/' + path);
    }

    /**
     * Add source file
     * @param {string} path - relative source file path
     */
    addSource(path) {
        document.write('<script src="' + this.root + "/" + path + '"></script>')
    }

    /**
     * Add all under engine source file
     */
    addSources() {
        this.addUnderSource("Scene.js");
    }
}