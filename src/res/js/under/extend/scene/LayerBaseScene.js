/**
 * Layer base scene
 * - Controls updating and rendering
 * - ### Basic form of a scene composed of layers
 * @implements {Scene}
 * @classdesc Layer base scene composed of layers
 */
class LayerBaseScene extends Scene { // eslint-disable-line  no-unused-vars
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
     * @param {Layer} layer Added layer
     */
    addLayer(layer) {
        this.layers.push(layer);
        layer.init();
    }

    /**
     * Update scene
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        for (let layer of this.layers) {
            layer.update(dt);
        }
    }

    /**
     * Render scene
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        for (let layer of this.layers) {
            layer.render(ctx);
        }
    }
}
