/**
 * Layer base scene
 * - Controls updating and rendering
 * - It consists of layers
 * - ### Basic form of a scene composed of layers
 * @implements {LayeredScene}
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
    }

    /**
     * Add layer
     * @override
     * @param {Layer} layer Added layer
     */
    addLayer(layer) {
        this.layers.push(layer);
        super.addLayer(layer);
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
}
