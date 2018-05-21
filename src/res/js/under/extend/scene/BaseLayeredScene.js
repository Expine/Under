/**
 * Layer base scene
 * - Controls updating and rendering
 * - It consists of layers
 * - ### Basic form of a scene composed of layers
 * @extends {LayeredScene}
 * @classdesc Layer base scene composed of layers
 */
class BaseLayeredScene extends LayeredScene { // eslint-disable-line  no-unused-vars
    /**
     * Base scene constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Layers of scene
         * @protected
         * @type {Array<Layer>}
         */
        this.layers = [];

        /**
         * Sorted layers by z order
         * @protected
         * @type {Array<Layer>}
         */
        this.sortedLayers = [];
    }

    /**
     * Add layer
     * @override
     * @param {Layer} layer Added layer
     */
    addLayer(layer) {
        this.layers.push(layer);
        super.addLayer(layer);

        // sort
        const index = this.sortedLayers.findIndex((it) => {
            return layer.z < it.z;
        });
        if (index >= 0) {
            this.sortedLayers.splice(index, 0, layer);
        } else {
            this.sortedLayers.push(layer);
        }
    }

    /**
     * Remove layer
     * @abstract
     * @param {Layer} layer Removed layer
     */
    removeLayer(layer) {
        let index = this.layers.indexOf(layer);
        if (index >= 0) {
            this.layers.splice(index, 1);
        }
        index = this.sortedLayers.indexOf(layer);
        if (index >= 0) {
            this.sortedLayers.splice(index, 1);
        }
    }

    /**
     * Get list pf layers
     * @override
     * @protected
     * @return {Array<Layer>} List of layers
     */
    getLayers() {
        return this.layers;
    }


    /**
     * Render scene
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        for (const layer of this.sortedLayers) {
            layer.render(ctx);
        }
    }
}
