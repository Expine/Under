import { Scene } from "../../base/scene/Scene";
import { Input } from "../../base/input/Input";
import { Context } from "../../base/resources/image/Context";

/**
 * Default title scene
 * - Default title scene example
 * - Sample of mouse processing, input processing and drawing processing
 * @extends {Scene}
 * @classdesc Default title scene indicating sample scene
 */
export class DefaultTitleScene extends Scene {
    /**
     * Circle radius
     * @private
     * @type {number}
     */
    private _r: number;
    /**
     * Circle angle
     * @private
     * @type {number}
     */
    private _angle: number;

    /**
     * Default title scene constructor
     * @constructor
     */
    constructor() {
        super();
        this._r = 10;
        this._angle = 0;
    }

    /**
     * Initialize scene
     * @override
     */
    init() { }

    /**
     * Update scene
     * @override
     * @param {number} dt Delta time
     */
    update(dt: number) {
        // update circle angle and radius
        if (Input.mouse.isPressed(Input.mouse.mLeft())) {
            this._r += dt / 20;
            this._angle = this._angle + Math.PI / 10 * dt / 20;
        } else {
            this._r -= dt / 20;
            this._angle = this._angle + Math.PI / 30 * dt / 20;
        }
        this._r = this._r > 20 ? 20 : this._r < 10 ? 10 : this._r;
        if (this._angle > Math.PI * 2.5) {
            this._angle -= Math.PI * 2.5;
        }
    }

    /**
     * Render scene
     * @override
     * @param {Context} ctx
     */
    render(ctx: Context) {
        // render sample text
        ctx.fillText(`Sample`, 400, 300, 0.5, null, null, null, null);

        // render when enter pressed
        if (Input.key.isPressed(Input.key.space())) {
            ctx.fillText(`Enter pressed`, 400, 400, 0.5, 0, 30, `red`, null);
        }

        // render circle on mouse
        const angle = this._angle > Math.PI * 2 ? Math.PI * 2 : this._angle;
        ctx.strokeCircle(Input.mouse.getMouseX(), Input.mouse.getMouseY(), this._r, 0, angle, false, null, null);
    }
}
