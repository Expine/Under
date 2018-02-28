/**
 * Context for rendering by JavaScript
 * Renders by using HTML5 API
 * @classdesc Context for rendering by JavaScript
 */
class GLContext extends Context {
    /**
     * JavaScript context constructor
     */
    constructor() {
        super();
        /**
         * Color of the text
         * @private
         * @type {string}
         */
        this.fontColor_ = "black";
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
        this.fontName = "Arial";

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
         * @type {CanvasRenderingContext2D}
         */
        this.gl_ = this.screen.getCanvas().getContext("webgl");
        this.ctx_ = this.screen.getCanvas().getContext("2d");
    }

    stroke() {
        const gl = this.gl_;
        const vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.GL_ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.GL_ARRAY_BUFFER, new Float32Array([
            0.0, 0.5,
            0.5, 0.0, -0.5, 0.0
        ]), gl.STATIC_COPY);

        const vs = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vs, GLVert.unvariant);
        gl.compileShader(vs);
        if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS))
            console.log(gl.getShaderInfoLog(vs));
        const fs = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fs, GLFlag.fillWhite);
        gl.compileShader(fs);
        if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS))
            console.log(gl.getShaderInfoLog(fs));

        const program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);

        const attributeLocation = gl.getAttribLocation(program, "position");
        gl.enableVertexAttribArray(attributeLocation);
        gl.bindBuffer(gl.GL_ARRAY_BUFFER, vertexBuffer);
        gl.vertexAttribPointer(attributeLocation, 2, gl.GL_FLOAT, false, 0, 0);

        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.GL_COLOR_BUFFER_BIT);
        gl.useProgram(program);
        gl.drawArrays(gl.GL_TRIANGLES, 0, 3);
        gl.flush();
    }

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
        this.fontColor_ = "rgb(" + r + "," + g + "," + b + ")";
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
    preRendering() {}

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
        this.ctx_.font = size + "px " + font;
        this.ctx_.fillStyle = color;
        this.ctx_.fillText(text, x - anchorX * this.ctx_.measureText(text).width, y + anchorY * size);
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
    strokeCircle(x, y, radius, startAngle, endAngle, anticlockwise) {
        this.ctx_.beginPath();
        this.ctx_.strokeStyle = "red";
        this.ctx_.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        this.ctx_.stroke();
        this.ctx_.closePath();
    }

    /**
     * Rendering square outline
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     */
    strokeRect(x, y, width, height) {
        this.ctx_.strokeRect(x, y, width, height);
    }

    drawImage(image, x, y) {
        this.ctx_.drawImage(image, x, y);
    }
    drawImage(image, x, y, width, height) {
        this.ctx_.drawImage(image, x, y, width, height);
    }

    drawImage(imageID, srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH) {
        let image = this.image.getImage(imageID);
        if (srcW === undefined)
            this.ctx_.drawImage(image, srcX, srcX);
        else if (dstX === undefined)
            this.ctx_.drawImage(image, srcX, srcY, srcW, srcH);
        else
            this.ctx_.drawImage(image, srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH)
    }
}