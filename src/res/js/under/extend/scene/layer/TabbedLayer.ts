import { Layer } from "../../../base/scene/layer/Layer";
import { Context } from "../../../base/resources/image/Context";

/**
 * Tabbed layer
 * - It can manage layers by tab
 * @interface
 * @extends {Layer}
 * @classdesc Tabbed layer that can manage layers by tab
 */
export abstract class TabbedLayer extends Layer {
    /**
     * Set layer position
     * @override
     * @param {number} x Layer x position
     * @param {number} y Layer y position
     * @param {number} z Layer z position
     */
    setPosition(x: number, y: number, z: number) {
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
    setSize(width: number, height: number) {
        super.setSize(width, height);
        for (const it of this.getTabs()) {
            it.setSize(width, height);
        }
    }

    /**
     * Add tab layer
     * @param {Layer} layer Added layer
     */
    addTab(layer: Layer) {
        layer.init();
    }

    /**
     * Remove tab layer
     * @abstract
     * @param {Layer} layer Removed layer
     */
    abstract removeTab(layer: Layer): void;

    /**
     * Get currently tab
     * @abstract
     * @return {Layer} Currently tab layer
     */
    abstract getTab(): Layer | null;

    /**
     * Get all tab layers
     * @abstract
     * @return {Array<Layer>} all tab layers
     */
    abstract getTabs(): Array<Layer>;

    /**
     * Update layer
     * @override
     * @param {number} dt Delta time
     */
    update(dt: number) {
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
    render(ctx: Context) {
        const tab = this.getTab();
        if (tab !== null) {
            tab.render(ctx);
        }
    }
}
