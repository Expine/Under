/**
 * Selecting tool
 * - Tool for editing
 * - ### Selects something
 * @extends {EditorTool}
 * @classdesc Selecting tool to select something
 */
class SelectingTool extends EditorTool { // eslint-disable-line  no-unused-vars
    /**
     * Selecting tool constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Selected x position
         * @protected
         * @type {number}
         */
        this.selectedX = -1;
        /**
         * Selected x position
         * @protected
         * @type {number}
         */
        this.selectedY = -1;
        /**
         * Selected width
         * @protected
         * @type {number}
         */
        this.selectedWidth = 32;
        /**
         * Selected height
         * @protected
         * @type {number}
         */
        this.selectedHeight = 32;

        /**
         * Resolution for editing
         * @protected
         * @type {nmber}
         */
        this.resolution = 32;
    }

    /**
     * Use tool by ID
     * @abstract
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @param {number} id Painting ID
     */
    use(x, y, id) {
        this.selectedX = Math.floor(x / this.resolution) * this.resolution;
        this.selectedY = Math.floor(y / this.resolution) * this.resolution;
    }

    /**
     * Render tool
     * @abstract
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        ctx.strokeRect(this.selectedX + shiftX, this.selectedY + shiftY, this.selectedWidth, this.selectedHeight, `white`);
    }
}
