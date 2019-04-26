import { TabbedLayer } from "./TabbedLayer";
import { Layer } from "../../../base/scene/layer/Layer";
import { Input } from "../../../base/input/Input";
import { Context } from "../../../base/resources/image/Context";

/**
 * Named tabbed layer
 * - Shows name and it can tap name tab
 * @extends {TabbedLayer}
 * @classdesc Named tabbed layer to show name and it can tap name tab
 */
export class NamedTabbedLayer extends TabbedLayer {
    /**
     * List of tab names
     * @protected
     * @type {Array<string>}
     */
    protected tabNames: Array<string>

    /**
     * List of tab layers
     * @protected
     * @type {Array<Layer>}
     */
    protected tabLayers: Array<Layer>

    /**
     * Currently tab index
     * @protected
     * @type {number}
     */
    protected currentlyTabIndex: number;

    /**
     * Tab reference x position
     * @protected
     * @type {number}
     */
    protected tabX: number;
    /**
     * Tab reference y position
     * @protected
     * @type {number}
     */
    protected tabY: number;
    /**
     * Tab width
     * @protected
     * @type {number}
     */
    protected tabWidth: number;
    /**
     * Tab height
     * @protected
     * @type {number}
     */
    protected tabHeight: number;
    /**
     * Tab padding
     * @protected
     * @type {number}
     */
    protected tabPadding: number;

    /**
     * Named tabbed layer constructor
     * @constructor
     */
    constructor() {
        super();

        this.tabNames = [];
        this.tabLayers = [];
        this.currentlyTabIndex = 0;
        this.tabX = 0;
        this.tabY = -20;
        this.tabWidth = 70;
        this.tabHeight = 20;
        this.tabPadding = 10;
    }

    /**
     * Add tab layer
     * @override
     * @param {Layer} layer Added layer
     */
    addTab(layer: Layer) {
        super.addTab(layer);
        this.tabLayers.push(layer);
        this.tabNames.push(layer.toString());
    }

    /**
     * Add tab with name
     * @param {Layer} layer Added layer
     * @param {string} name Tab name
     */
    addTabWithName(layer: Layer, name: string) {
        this.addTab(layer);
        this.tabNames[this.tabNames.length - 1] = name;
    }

    /**
     * Remove tab layer
     * @override
     * @param {Layer} layer Removed layer
     */
    removeTab(layer: Layer) {
        const index = this.tabLayers.indexOf(layer);
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
    getTab(): Layer | null {
        const ret = this.tabLayers[this.currentlyTabIndex];
        return ret !== undefined ? ret : null;
    }

    /**
     * Get all tab layers
     * @abstract
     * @return {Array<Layer>} all tab layers
     */
    getTabs(): Array<Layer> {
        return this.tabLayers;
    }

    /**
     * Initialize scene
     * @override
     */
    init() { }

    /**
     * Update layer
     * @override
     * @param {number} dt Delta time
     */
    update(dt: number) {
        super.update(dt);

        const x = Input.mouse.getMouseX() - this.x;
        const y = Input.mouse.getMouseY() - this.y;
        if (Input.mouse.isPress(Input.mouse.mLeft())) {
            for (let i = 0; i < this.tabLayers.length; ++i) {
                const sx = this.x + this.tabX + (this.tabWidth + this.tabPadding) * i;
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
    render(ctx: Context) {
        for (let i = 0; i < this.tabNames.length; ++i) {
            ctx.fillRect(this.x + this.tabX + (this.tabWidth + this.tabPadding) * i, this.y + this.tabY, 70, 15, 'white');
            ctx.fillText('${this.tabNames[i]}', this.x + this.tabX + (this.tabWidth + this.tabPadding) * (i + 0.4), this.y + this.tabY + this.tabHeight / 2.7, 0.5, 0.5, 12, 'black');
        }
        super.render(ctx);
    }
}
