import { SignObject } from "../../../../under/extend/stage/entity/object/SignObject";
import { TextWindowEvent } from "../../../event/common/TextWindowEvent";
import { Input } from "../../../../under/base/input/Input";
import { Context } from "../../../../under/base/resources/image/Context";

/**
 * Immutable event object
 * - Show sign text
 * @extends {SignObject}
 * @classdesc Immutable event object to show sign text
 */
export class TextSignObject extends SignObject {
    /**
     * Sign text
     * @protected
     * @type {string}
     */
    protected signText: string;

    /**
     * Sign text size
     * @protected
     * @type {number}
     */
    protected size: number;

    /**
     * Whether sign text has already exists
     * @protected
     * @type {boolean}
     */
    protected isExec: boolean;
    /**
     * Text window
     * @protected
     * @type {TextWindowEvent}
     */
    protected textWindow: TextWindowEvent | null;

    /**
     * Influential event object constructor
     * @constructor
     */
    constructor() {
        super();
        this.signText = ``;
        this.size = 0;
        this.isExec = false;
        this.textWindow = null;
    }

    /**
     * Set sign information
     * @param {number} x Sign relative x position
     * @param {number} y Sign relative y position
     * @param {number} size Sign text size
     * @param {string} text Sign text
     */
    setSignText(x: number, y: number, size: number, text: string) {
        super.setSign(null, x, y);
        this.size = size;
        this.signText = text;
    }

    /**
     * Initialize entity
     * @override
     */
    init() {
        super.init();
        this.textWindow = new TextWindowEvent(this.signText, this.x + this.signX, this.y + this.signY, this.signText, this.size);
    }

    /**
     * Update entty
     * @override
     * @param {number} dt Delta time
     */
    update(dt: number) {
        super.update(dt);
        if (this.textWindow === null) {
            return;
        }
        if (this.isShowSign && !this.isExec) {
            this.textWindow.init();
        }
        if (this.isShowSign) {
            Input.key.block(Input.key.sub());
            this.textWindow.update(dt);
            Input.key.unblock(Input.key.sub());
        }
        if (!this.isShowSign && this.isExec) {
            Input.key.unblock(Input.key.sub());
        }
        this.isExec = this.isShowSign;
    }
    /**
     * Render entity
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx: Context, shiftX: number = 0, shiftY: number = 0) {
        super.render(ctx, shiftX, shiftY);
        if (this.textWindow === null) {
            return;
        }
        this.textWindow.x = this.x + this.signX + shiftX;
        this.textWindow.y = this.y + this.signY + shiftY;
        if (this.isShowSign) {
            this.textWindow.render(ctx);
        }
    }
}
