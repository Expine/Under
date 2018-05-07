/**
 * Named tabbed layer
 * - Performs drawing processing collectively
 * - It can manage layers by tab
 * - ### Shows name and it can tap name tab
 * @extends {TabbedLayer}
 * @classdesc Named tabbed layer to show name and it can tap name tab
 */
class NamedTabbedLayer extends TabbedLayer { // eslint-disable-line  no-unused-vars
    /**
     * Named tabbed layer constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * List of tab names
         * @protected
         * @type {Array<string>}
         */
        this.tabNames = [];

        /**
         * List of tab layers
         * @protected
         * @type {Array<Layer>}
         */
        this.tabLayers = [];

        /**
         * Currently tab index
         * @protected
         * @type {number}
         */
        this.currentlyTabIndex = 0;

        /**
         * Tab reference x position
         * @protected
         * @type {number}
         */
        this.tabX = 0;
        /**
         * Tab reference y position
         * @protected
         * @type {number}
         */
        this.tabY = -20;
        /**
         * Tab width
         * @protected
         * @type {number}
         */
        this.tabWidth = 70;
        /**
         * Tab height
         * @protected
         * @type {number}
         */
        this.tabHeight = 20;
        /**
         * Tab padding
         * @protected
         * @type {number}
         */
        this.tabPadding = 10;
    }

    /**
     * Add tab layer
     * @override
     * @param {Layer} layer Added layer
     */
    addTab(layer) {
        super.addTab(layer);
        this.tabLayers.push(layer);
        this.tabNames.push(layer.toString());
    }

    /**
     * Add tab with name
     * @param {Layer} layer Added layer
     * @param {string} name Tab name
     */
    addTabWithName(layer, name) {
        this.addTab(layer);
        this.tabNames[this.tabNames.length - 1] = name;
    }

    /**
     * Remove tab layer
     * @override
     * @param {Layer} layer Removed layer
     */
    removeTab(layer) {
        let index = this.tabLayers.indexOf(layer);
        if (index >= 0) {
            this.tabLayers.splice(index, 1);
            this.tabNames.splice(index, 1);
        }
    }

    /**
     * Get currently tab
     * @override
     * @return {Layer} Currently tab layer
     */
    getTab() {
        let ret = this.tabLayers[this.currentlyTabIndex];
        return ret !== undefined ? ret : null;
    }

    /**
     * Get all tab layers
     * @abstract
     * @return {Array<Layer>} all tab layers
     */
    getTabs() {
        return this.tabLayers;
    }

    /**
     * Update layer
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        super.update(dt);

        let x = Input.mouse.getMouseX() - this.x;
        let y = Input.mouse.getMouseY() - this.y;
        if (Input.mouse.isPress(Input.mouse.mLeft())) {
            for (let i = 0; i < this.tabLayers.length; ++i) {
                let sx = this.x + this.tabX + (this.tabWidth + this.tabPadding) * i;
                if (sx < x && x < sx + this.tabWidth && this.tabY < y && y < this.tabY + this.tabHeight) {
                    this.currentlyTabIndex = i;
                    break;
                }
            }
        }
    }

    /**
     * Render layer
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        for (let i = 0; i < this.tabNames.length; ++i) {
            ctx.fillRect(this.x + this.tabX + (this.tabWidth + this.tabPadding) * i, this.y + this.tabY, 70, 15, `white`);
            ctx.fillText(`${this.tabNames[i]}`, this.x + this.tabX + (this.tabWidth + this.tabPadding) * (i + 0.4), this.y + this.tabY + this.tabHeight / 2.7, 0.5, 0.5, 12, `black`);
        }
        super.render(ctx);
    }
}
