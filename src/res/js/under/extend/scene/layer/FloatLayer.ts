import { Layer } from "../../../base/scene/layer/Layer";
import { Context } from "../../../base/resources/image/Context";

/**
 * Float layer
 * - It can move freely
 * @extends {Layer}
 * @classdesc Float layer that can move freely
 */
export class FloatLayer extends Layer {
    /**
     * Delegate layer
     * @protected
     * @type {Layer}
     */
    protected delegate: Layer;

    /**
     * Float layer constructor
     * @constructor
     * @param {Layer} delegate Delegte layer
     */
    constructor(delegate: Layer) {
        super();
        this.delegate = delegate;
    }

    /**
     * Set layer position
     * @override
     * @param {number} x Layer x position
     * @param {number} y Layer y position
     * @param {number} z Layer z position
     */
    setPosition(x: number, y: number, z: number) {
        super.setPosition(x, y, z);
        this.delegate.setPosition(x, y, z);
    }

    /**
     * Set layer size
     * @override
     * @param {number} width Layer width
     * @param {number} height Layer height
     */
    setSize(width: number, height: number) {
        super.setSize(width, height);
        this.delegate.setSize(width, height);
    }

    /**
     * Initialize scene
     * @override
     */
    init() {
        this.delegate.init();
    }

    /**
     * Update layer
     * @override
     * @param {number} dt Delta time
     */
    update(dt: number) {
        this.delegate.update(dt);

        // TODO:: move in screen
    }

    /**
     * Render layer
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx: Context) {
        this.delegate.render(ctx);
    }
}
