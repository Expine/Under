import { Background } from "../../../base/stage/back/Background";
import { Context } from "../../../base/resources/image/Context";

/**
 * Sequential background
 * - Processes continuously
 * @extends {Background}
 * @classdesc Sequential background to process continuously
 */
export class SequentialBackground extends Background {
    /**
     * List of backgrounds to process consecutively
     * @protected
     * @type {Array<Background>}
     */
    protected backs: Array<Background>;

    /**
     * Sequential background constructor
     * @constructor
     */
    constructor() {
        super();

        this.backs = [];
    }

    /**
     * Add background to list
     * @param {Background} back Background
     */
    addBackground(back: Background) {
        this.backs.push(back);
    }

    /**
     * Initialize background
     * @override
     */
    init() {
        for (const it of this.backs) {
            it.init();
        }
    }

    /**
     * Update background
     * @override
     * @param {number} dt delta time
     */
    update(dt: number) {
        for (const it of this.backs) {
            it.update(dt);
        }
    }

    /**
     * Render background
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     * @param {number} screenWidth Scren width
     * @param {number} screenHeight Scren height
     */
    render(ctx: Context, shiftX: number, shiftY: number, screenWidth: number, screenHeight: number) {
        for (const back of this.backs) {
            back.render(ctx, shiftX, shiftY, screenWidth, screenHeight);
        }
    }
}
