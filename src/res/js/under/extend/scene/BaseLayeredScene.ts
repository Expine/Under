import { Layer } from "../../base/scene/layer/Layer";
import { LayeredScene } from "../../base/scene/LayeredScene";
import { Context } from "../../base/resources/image/Context";

/**
 * Layer base scene
 * - Basic form of a scene composed of layers
 * @abstract
 * @extends {LayeredScene}
 * @classdesc Layer base scene composed of layers
 */
export abstract class BaseLayeredScene extends LayeredScene {
    /**
     * Layers of scene
     * @protected
     * @type {Array<Layer>}
     */
    protected layers: Array<Layer>;

    /**
     * Sorted layers by z order
     * @protected
     * @type {Array<Layer>}
     */
    protected sortedLayers: Array<Layer>;

    /**
     * Base scene constructor
     * @constructor
     */
    constructor() {
        super();

        this.layers = [];
        this.sortedLayers = [];
    }

    /**
     * Add layer
     * @override
     * @param {Layer} layer Added layer
     */
    addLayer(layer: Layer) {
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
    removeLayer(layer: Layer) {
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
    protected getLayers(): Array<Layer> {
        return this.layers;
    }


    /**
     * Render scene
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx: Context) {
        for (const layer of this.sortedLayers) {
            layer.render(ctx);
        }
    }
}
