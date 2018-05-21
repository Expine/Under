/**
 * Editor base
 * - Operates editor
 * - ### Base of editing tools
 * @interface
 * @classdesc Editor base of editing tools
 */
class EditorBase /* , IEditorFunction */ { // eslint-disable-line  no-unused-vars
    /**
     * Editor base constructor
     * @constructor
     */
    constructor() {
        /**
         * Target for editing
         * @protected
         * @type {IEditorTarget}
         */
        this.target = null;

        /**
         * Selectors for selecting element
         * @protected
         * @type {Array<ISelection>}
         */
        this.selectors = [];
    }

    /**
     * Set edtor target
     * @param {IEditorTarget} target Target for editing
     */
    setTarget(target) {
        this.target = target;
    }

    /**
     * Add selector for selecting element
     * @param {ISelection} selector Selector for selecting element
     */
    addSelector(selector) {
        this.selectors.push(selector);
    }

    /**
     * Add editor tool
     * @param {string} name Tool name
     * @param {EditorTool} tool Editor tool
     */
    addTool(name, tool) {
        tool.setEditor(this);
        tool.init();
    }

    /**
     * Get editor target
     * @override
     * @protected
     * @return {IEditorTarget} Editor target
     */
    getTarget() {
        return this.target;
    }

    /**
     * Change editor tool by name
     * @abstract
     * @protected
     * @param {string} name Tool name
     */
    changeTool(name) {}

    /**
     * Set current ID
     * @abstract
     * @protected
     * @param {number} id Setting ID
     */
    setCurrentID(id) {}

    /**
     * Get current painting ID
     * @abstract
     * @protected
     * @return {number} Current painting ID
     */
    getCurrentID() {}

    /**
     * Get all tools
     * @abstract
     * @protected
     * @return {Array<EditorTool>} All tools
     */
    getTools() {}

    /**
     * Get current tool
     * @abstract
     * @protected
     * @return {EditorTool} Current tool
     */
    getCurrentTool() {}

    /**
     * Initialize editor
     * @abstract
     */
    init() {}

    /**
     * Update editor
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @param {number} dt Delta time
     */
    update(x, y, dt) {
        for (const it of this.getTools()) {
            it.update(x, y, dt);
        }
        const tool = this.getCurrentTool();
        if (tool !== null) {
            tool.use(x, y, this.getCurrentID());
        }
    }

    /**
     * Render editor
     * @abstract
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        const tool = this.getCurrentTool();
        if (tool !== null) {
            tool.render(ctx, shiftX, shiftY);
        }
    }
}
