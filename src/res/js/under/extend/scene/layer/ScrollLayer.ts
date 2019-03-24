import { Layer } from "../../../base/scene/layer/Layer";
import { ClipLayer } from "../../../base/scene/layer/ClipLayer";
import { Context } from "../../../base/resources/image/Context";

/**
 * Scroll layer
 * - It can scroll inner elements
 * @extends {Layer}
 * @classdesc Scroll layer that can scroll inner elements
 */
export class ScrollLayer extends Layer {
    /**
     * Delegate cliping layer
     * @protected
     * @type {ClipLayer}
     */
    protected delegate: ClipLayer;

    /**
     * Scrolling x position
     * @protected
     * @type {number}
     */
    protected scrollX: number;
    /**
     * Scrolling y position
     * @protected
     * @type {number}
     */
    protected scrollY: number;
    /**
     * Scroll layer constructor
     * @constructor
     * @param {ClipLayer} delegate Delegte cliping layer
     */
    constructor(delegate: ClipLayer) {
        super();

        this.delegate = delegate;
        this.scrollX = 0;
        this.scrollY = 0;
    }

    /**
     * Scroll relatively
     * @param {number} x Scroll relative x
     * @param {number} y Scroll relative y
     */
    scroll(x: number, y: number) {
        this.scrollX += x;
        this.scrollY += y;
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
        const width = this.delegate.width;
        const height = this.delegate.height;
        if (this.width < width) {
            if (this.scrollX < 0) {
                this.scrollX = 0;
            } else if (this.scrollX > width - this.width) {
                this.scrollX = width - this.width;
            }
        } else {
            this.scrollX = 0;
        }
        if (this.height < height) {
            if (this.scrollY < 0) {
                this.scrollY = 0;
            } else if (this.scrollY > height - this.height) {
                this.scrollY = height - this.height;
            }
        } else {
            this.scrollY = 0;
        }
        // update
        this.delegate.setPosition(this.x - this.scrollX, this.y - this.scrollY, this.z);
        this.delegate.clip(this.x, this.y, this.width, this.height);
        this.delegate.update(dt);
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
