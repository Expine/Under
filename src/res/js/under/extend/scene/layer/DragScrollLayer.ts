import { ScrollLayer } from "./ScrollLayer";
import { ClipLayer } from "../../../base/scene/layer/ClipLayer";
import { Input } from "../../../base/input/Input";

/**
 * Drag scroll layer
 * - It can scroll by mouse dragging
 * @extends {ScrollLayer}
 * @classdesc Drag scroll layer that can scroll mouse dragging
 */
export class DragScrollLayer extends ScrollLayer {
    /**
     * Currently mouse x position
     * @protected
     * @type {number}
     */
    protected oldMouseX: number;
    /**
     * Currently mouse y position
     * @protected
     * @type {number}
     */
    protected oldMouseY: number;

    /**
     * Whether scrolling or not
     * @protected
     * @type {boolean}
     */
    protected scrolling: boolean;

    /**
     * Drag scroll layer constructor
     * @constructor
     * @param {ClipLayer} delegate Delegte cliping layer
     */
    constructor(delegate: ClipLayer) {
        super(delegate);

        this.oldMouseX = 0;
        this.oldMouseY = 0;
        this.scrolling = false;
    }

    /**
     * Update layer
     * @override
     * @param {number} dt Delta time
     */
    update(dt: number) {
        const x = Input.mouse.getMouseX();
        const y = Input.mouse.getMouseY();
        if (this.x <= x && x < this.x + this.width && this.y <= y && y < this.y + this.height && Input.mouse.isPress(Input.mouse.mRight())) {
            this.scrolling = true;
            this.oldMouseX = x;
            this.oldMouseY = y;
        }
        if (!Input.mouse.isPressed(Input.mouse.mRight())) {
            this.scrolling = false;
        }
        if (this.scrolling) {
            // block
            Input.mouse.block(Input.mouse.mRight());
            this.scroll(x - this.oldMouseX, y - this.oldMouseY);
            this.oldMouseX = x;
            this.oldMouseY = y;
        }
        // update scroll
        super.update(dt);
    }
}
