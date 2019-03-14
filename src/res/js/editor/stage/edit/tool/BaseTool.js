/**
 * Base tool
 * - Tool for editing
 * - ### Selects something
 * @interface
 * @extends {EditorTool}
 * @classdesc Base tool to select something
 */
class BaseTool extends EditorTool {
    /**
     * Base tool constructor
     * @constructor
     * @param {GameImage} [image=null] Tool image
     * @param {number} [key=-1] Key code for shortcut
     */
    constructor(image = null, key = -1) {
        super();

        /**
         * Tool image
         * @protected
         * @type {GameImage}
         */
        this.image = image;
        /**
         * Key code for shortcut
         * @protected
         * @param {number}
         */
        this.key = key;

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
     * Shortcut for switching
     * @abstract
     * @protected
     */
    shortcut() {}

    /**
     * Initialize tool
     * @override
     */
    init() {
        if (this.image !== null) {
            this.image.init();
        }
    }

    /**
     * Update tool
     * @override
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @param {number} dt Delta time
     */
    update(x, y, dt) {
        // swicth pencil (1)
        if (this.key >= 0 && Input.key.isPress(this.key)) {
            this.shortcut();
        }
        if (this.image !== null) {
            this.image.update(dt);
        }
    }

    /**
     * Use tool by ID
     * @override
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
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        ctx.strokeRect(this.selectedX + shiftX, this.selectedY + shiftY, this.selectedWidth, this.selectedHeight, `white`);
        if (this.image !== null) {
            this.image.render(ctx, this.selectedX + shiftX + 16, this.selectedY + shiftY);
        }
    }
}
