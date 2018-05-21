/**
 * Simple editor
 * - Operates editor
 * - Base of editing tools
 * - ### Uses simple tools
 * @extends {EditorBase}
 * @classdesc Simple editor to use simple tools
 */
class SimpleEditor extends EditorBase { // eslint-disable-line  no-unused-vars
    /**
     * Simple editor constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Cuurent tool to use
         * @protected
         * @type {EditorTool}
         */
        this.currentTool = null;

        /**
         * Current painting ID
         * @protected
         * @type {number}
         */
        this.currentID = -1;

        /**
         * Tools for editing
         * @protected
         * @type {Object<string, EditorTool>}
         */
        this.tools = {};
    }

    /**
     * Update selector for setting painting ID
     * @protected
     */
    updateSelector() {
        let cleared = true;
        for (const it of this.selectors) {
            const selected = it.getSelected();
            if (selected >= 0) {
                cleared = false;
                if (this.currentID !== selected) {
                    this.currentID = selected;
                    break;
                }
            }
        }
        if (cleared) {
            this.currentID = -1;
        }
        for (const it of this.selectors) {
            if (this.currentID !== it.getSelected()) {
                it.setSelected(-1);
            }
        }
    }

    /**
     * Add editor tool
     * @override
     * @param {string} name Tool name
     * @param {EditorTool} tool Editor tool
     */
    addTool(name, tool) {
        super.addTool(name, tool);
        this.tools[name] = tool;
    }

    /**
     * Change editor tool by name
     * @override
     * @protected
     * @param {string} name Tool name
     */
    changeTool(name) {
        this.currentTool = this.tools[name];
    }

    /**
     * Set current ID
     * @override
     * @protected
     * @param {number} id Setting ID
     */
    setCurrentID(id) {
        this.currentID = id;
        for (const it of this.selectors) {
            it.setSelected(id);
        }
    }

    /**
     * Get all tools
     * @override
     * @protected
     * @return {Array<EditorTool>} All tools
     */
    getTools() {
        const tools = [];
        for (const it in this.tools) {
            if (this.tools.hasOwnProperty(it)) {
                tools.push(this.tools[it]);
            }
        }
        return tools;
    }

    /**
     * Get current tool
     * @override
     * @protected
     * @return {EditorTool} Current tool
     */
    getCurrentTool() {
        return this.currentTool;
    }

    /**
     * Get current painting ID
     * @override
     * @protected
     * @return {number} Current painting ID
     */
    getCurrentID() {
        return this.currentID;
    }

    /**
     * Initialize editor
     * @override
     */
    init() {
        this.changeTool(`pencil`);
    }

    /**
     * Update editor
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @param {number} dt Delta time
     */
    update(x, y, dt) {
        this.updateSelector();
        super.update(x, y, dt);
    }
}
