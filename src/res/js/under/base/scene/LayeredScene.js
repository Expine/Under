/**
 * Layered scene
 * - Controls updating and rendering
 * - ### It consists of layers
 * @extends {Scene}
 * @classdesc Layered scene that consists of layers
 */
class LayeredScene extends Scene { // eslint-disable-line  no-unused-vars
    /**
     * Add layer
     * @param {Layer} layer Added layer
     */
    addLayer(layer) {
        layer.init();
    }

    /**
     * Remove layer
     * @abstract
     * @param {Layer} layer Removed layer
     */
    removeLayer(layer) {}

    /**
     * Clear all layer
     */
    clearLayer() {
        for (const it of this.getLayers().reverse()) {
            this.removeLayer(it);
        }
    }

    /**
     * Get list pf layers
     * @abstract
     * @protected
     * @return {Array<Layer>} List of layers
     */
    getLayers() {}

    /**
     * Update scene
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        for (const layer of this.getLayers()) {
            layer.update(dt);
        }
    }

    /**
     * Render scene
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        for (const layer of this.getLayers()) {
            layer.render(ctx);
        }
    }
}
