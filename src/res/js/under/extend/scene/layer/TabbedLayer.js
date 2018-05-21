/**
 * Tabbed layer
 * - Performs drawing processing collectively
 * - ### It can manage layers by tab
 * @interface
 * @extends {Layer}
 * @classdesc Tabbed layer that can manage layers by tab
 */
class TabbedLayer extends Layer { // eslint-disable-line  no-unused-vars
    /**
     * Set layer position
     * @override
     * @param {number} x Layer x position
     * @param {number} y Layer y position
     * @param {number} z Layer z position
     */
    setPosition(x, y, z) {
        super.setPosition(x, y, z);
        for (const it of this.getTabs()) {
            it.setPosition(x, y, z);
        }
    }

    /**
     * Set layer size
     * @override
     * @param {number} width Layer width
     * @param {number} height Layer height
     */
    setSize(width, height) {
        super.setSize(width, height);
        for (const it of this.getTabs()) {
            it.setSize(width, height);
        }
    }

    /**
     * Add tab layer
     * @param {Layer} layer Added layer
     */
    addTab(layer) {
        layer.init();
    }

    /**
     * Remove tab layer
     * @abstract
     * @param {Layer} layer Removed layer
     */
    removeTab(layer) {}

    /**
     * Get currently tab
     * @abstract
     * @return {Layer} Currently tab layer
     */
    getTab() {}

    /**
     * Get all tab layers
     * @abstract
     * @return {Array<Layer>} all tab layers
     */
    getTabs() {}

    /**
     * Update layer
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        const tab = this.getTab();
        if (tab !== null) {
            tab.update(dt);
        }
    }

    /**
     * Render layer
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        const tab = this.getTab();
        if (tab !== null) {
            tab.render(ctx);
        }
    }
}
