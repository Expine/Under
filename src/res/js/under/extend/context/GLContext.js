/**
 * Context for rendering by WebGL
 * Renders by using WebGL
 * @classdesc Context for rendering by WebGL
 */
class GLContext extends Context { // eslint-disable-line  no-unused-vars
    /**
     * WebGL context constructor
     */
    constructor() {
        super();
        /**
         * Color of the text
         * @private
         * @type {string}
         */
        this.fontColor_ = `black`;
        /**
         * Size of the text
         * @private
         * @type {number}
         */
        this.fontSize = 50;
        /**
         * Font name of the text
         * @private
         * @type {string}
         */
        this.fontName = `Arial`;

        // set default image manager
        this.setContextImage(new JSCachedImage());
    }

    /**
     * Set screen
     * @param {Screen} screen Screen system
     */
    setScreen(screen) {
        super.setScreen(screen);
        /**
         * GL context for rendering
         * @private
         * @type {WebGLRenderingContext}
         */
        this.gl_ = this.screen.getCanvas().getContext(`webgl`);
    }

    stroke() {}

    /**
     * Set the color of text
     * @interface
     * @param {string} colorName Color name
     */
    setFontColorByName(colorName) {
        this.fontColor_ = colorName;
    }

    /**
     * Set the color of text
     * @interface
     * @param {number} r Red component   (0 <= r <= 255)
     * @param {number} g Green component (0 <= g <= 255)
     * @param {number} b Blue component  (0 <= b <= 255)
     */
    setFontColorByRGB(r, g, b) {
        this.fontColor_ = `rgb(` + r + `,` + g + `,` + b + `)`;
    }

    /**
     * Set the size of text
     * @interface
     * @param {number} size Size of text
     */
    setFontSize(size) {
        this.fontSize = size;
    }

    /**
     * Set the name of font
     * @interface
     * @param {string} name Name of font
     */
    setFontName(name) {
        this.fontName = name;
    }

    /**
     * Function to be executed before drawing
     * @override
     */
    preRendering() {
        this.gl_.clearColor(1.0, 1.0, 1.0, 1.0);
        this.gl_.clear(this.gl_.COLOR_BUFFER_BIT);
    }

    /**
     * Function to be executed after drawing
     * @override
     */
    postRendering() {}

    /**
     * Render text
     * @override
     * @param {string} text Rendering text
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} [anchorX=0] Anchor x point in percent (0.0 <= anchorX <= 1.0)
     * @param {number} [anchorY=0] Anchor y point in percent (0.0 <= anchorX <= 1.0)
     * @param {number} [size=fontSize] Font size
     * @param {string} [color=fontColor] Font color
     * @param {string} [font=fontName] Font name
     */
    fillText(text, x, y, anchorX = 0, anchorY = 0, size = this.fontSize, color = this.fontColor_, font = this.fontName) {
        const gl = this.gl_;
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

        var vSource = [
            `precision mediump float;`,
            `attribute vec2 vertex;`,
            `void main(void) {`,
            `gl_Position = vec4(vertex * vec2(2.0, 1.0), 0.0, 1.0);`,
            `}`,
        ].join(`\n`);
        var vShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vShader, vSource);
        gl.compileShader(vShader);
        gl.getShaderParameter(vShader, gl.COMPILE_STATUS);
        if (!gl.getShaderParameter(vShader, gl.COMPILE_STATUS)) {
            console.log(gl.getShaderInfoLog(vShader));
        }
        var rgba = [0.0, 0.0, 0.0, 1.0]; // Red, Green, Blue, Alpha
        var fSource = [
            `precision mediump float;`,
            `void main(void) {`,
            `gl_FragColor = vec4(` + rgba.join(`,`) + `);`,
            `}`,
        ].join(`\n`);
        var fShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fShader, fSource);
        gl.compileShader(fShader);
        gl.getShaderParameter(fShader, gl.COMPILE_STATUS);

        var program = gl.createProgram();
        gl.attachShader(program, vShader);
        gl.attachShader(program, fShader);
        gl.linkProgram(program);
        gl.getProgramParameter(program, gl.LINK_STATUS);
        gl.useProgram(program);

        var vertex = gl.getAttribLocation(program, `vertex`);
        gl.enableVertexAttribArray(vertex);
        gl.vertexAttribPointer(vertex, 2, gl.FLOAT, false, 0, 0);

        var vertices = [
            0.0, 0.5,
            0.5, 0.0, -0.5, 0.0,
        ];

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }


    /**
     * Rendering circle
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} radius Raius of circle
     * @param {number} startAngle Beginning of arc
     * @param {number} endAngle End of arc
     * @param {boolean} anticlockwise Whether it is clockwise or not
     */
    strokeCircle(x, y, radius, startAngle, endAngle, anticlockwise) {}

    /**
     * Rendering square outline
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     */
    strokeRect(x, y, width, height) {}

    drawImage(imageID, srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH) {}
}
