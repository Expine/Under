import { QueueEventManager } from "./QueueEventManager";
import { GameImage } from "../../base/resources/image/GameImage";
import { Context } from "../../base/resources/image/Context";

/**
 * With background event manager
 * - Render background
 * @extends {QueueEventManager}
 * @classdesc With background event manager to render background
 */
export class WithBackgroundEventManager extends QueueEventManager {
    /**
     * Background image
     * @protected
     * @type {GameImage}
     */
    protected backImage: GameImage;

    /**
     * With background event manager constructor
     * @constructor
     * @param {GameImage} backImage Background image
     */
    constructor(backImage: GameImage) {
        super();
        this.backImage = backImage;
    }

    /**
     * Initialize event manager
     * @abstract
     */
    init() {
        this.backImage.init();
    }

    /**
     * Update event manager
     * @override
     * @param {number} dt Delta time
     */
    update(dt: number) {
        super.update(dt);
        this.backImage.update(dt);
    }

    /**
     * Render scene
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx: Context) {
        if (this.runningEvents.length > 0) {
            this.backImage.render(ctx, 0, 0);
        }
        super.render(ctx);
    }
}
