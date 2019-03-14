import { Scene } from './Scene';
import { Layer } from './layer/Layer';
import { Context } from '../resources/image/Context';
/**
 * Layered scene
 * - It consists of layers
 * @abstract
 * @extends {Scene}
 * @classdesc Layered scene that consists of layers
 */
export abstract class LayeredScene extends Scene {
    /**
     * Add layer
     * @param {Layer} layer Added layer
     */
    addLayer(layer: Layer) {
        layer.init();
    }

    /**
     * Remove layer
     * @abstract
     * @param {Layer} layer Removed layer
     */
    abstract removeLayer(layer: Layer): void;

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
    protected abstract getLayers(): Array<Layer>;

    /**
     * Update scene
     * @override
     * @param {number} dt Delta time
     */
    update(dt: number) {
        for (const layer of this.getLayers()) {
            layer.update(dt);
        }
    }

    /**
     * Render scene
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx: Context) {
        for (const layer of this.getLayers()) {
            layer.render(ctx);
        }
    }
}
