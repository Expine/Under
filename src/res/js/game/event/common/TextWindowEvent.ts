import { NamedEvent } from "../../../under/base/event/common/NamedEvent";
import { Input } from "../../../under/base/input/Input";
import { Context } from "../../../under/base/resources/image/Context";
import { ResourceManager } from "../../../under/base/resources/ResourceManager";
import { Util } from "../../../under/extend/util/Util";

/**
 * Text window event
 * - Render text and window
 * @extends {NamedEvent}
 * @classdesc Text window event to render text and window
 */
export class TextWindowEvent extends NamedEvent {
    /**
     * Text x position
     * @protected
     * @type {number}
     */
    x: number;
    /**
     * Text y position
     * @protected
     * @type {number}
     */
    y: number;

    /**
     * Talking sentence
     * @protected
     * @type {string}
     */
    protected sentence: string;

    /**
     * Font size
     * @protected
     * @type {number}
     */
    protected size: number;

    /**
     * Show count
     * @@protected
     * @type {number}
     */
    protected showCount: number;

    /**
     * Whether Showing is ended or not
     * @protected
     * @type {boolean}
     */
    protected ended: boolean;

    /**
     * Text window event constructor
     * @constructor
     * @param {string} name Identified name
     * @param {number} x Text x position
     * @param {number} y Text y position
     * @param {string} sentence Talking sentence
     * @param {number} [size=-1] Font size
     */
    constructor(name: string, x: number, y: number, sentence: string, size: number = -1) {
        super(name);

        this.x = x;
        this.y = y;
        this.sentence = sentence;
        this.size = size;
        this.showCount = 0;
        this.ended = false;
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        this.showCount = 0;
        this.ended = false;
        if (this.op !== null) {
            this.op.next();
        }
    }

    /**
     * Destructor of event
     * @override
     */
    destruct() { }

    /**
     * Update event
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether update is endped or not
     */
    update(dt: number): boolean {
        if (this.ended) {
            this.showCount -= dt / 200;
            if (this.showCount < 0) {
                this.showCount = 0;
                return true;
            }
        } else {
            this.showCount += dt / 1000;
            if (this.showCount > 1) {
                this.showCount = 1;
            }
            if (this.showCount === 1 && Input.key.isPressed(Input.key.yes())) {
                this.ended = true;
            }
        }
        return false;
    }

    /**
     * Render event
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx: Context) {
        const id = ResourceManager.image.load('window/win2.png');
        const size = (this.size === -1 ? 25 : this.size) * this.showCount * this.showCount;
        const width = ctx.measureText(this.sentence, size);
        Util.renderWindow(ctx, id, this.x - (width + 64) / 2, this.y - (64 + size) / 2, width + 64, 64 + size);
        ctx.fillText(this.sentence, this.x, this.y, 0.5, 0.5, size);
    }
}
