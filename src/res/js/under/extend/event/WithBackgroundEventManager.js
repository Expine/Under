/**
 * With background event manager
 * - Manages update and rendering event
 * - Controls event
 * - Registers event
 * - Uses the queue to manage events
 * - ### Render background
 * @extends {QueueEventManager}
 * @classdesc With background event manager to render background
 */
class WithBackgroundEventManager extends QueueEventManager {
    /**
     * With background event manager constructor
     * @constructor
     * @param {GameImage} backImage Background image
     */
    constructor(backImage) {
        super();

        /**
         * Background image
         * @protected
         * @type {GameImage}
         */
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
    update(dt) {
        super.update(dt);
        this.backImage.update(dt);
    }

    /**
     * Render scene
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        if (this.runningEvents.length > 0) {
            this.backImage.render(ctx, 0, 0);
        }
        super.render(ctx);
    }
}
