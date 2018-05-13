/**
 * Vanish state
 * - Determines the operation by AI according to the state and renders based on state
 * - ### Showes entity
 * @extends {State}
 * @classdesc Vanish state to show entity
 */
class ShowState extends State { // eslint-disable-line  no-unused-vars
    /**
     * Vanish state constructor
     * @constructor
     * @param {number} showTime Showing time
     */
    constructor(showTime) {
        super();

        /**
         * Showing time
         * @protected
         * @type {number}
         */
        this.showTime = showTime;
        /**
         * Showing count
         * @protected
         * @type {number}
         */
        this.showCount = 0;
    }

    /**
     * Initialize
     * @override
     */
    init() {
        this.entity.collider.enable = true;
        this.showCount = 0;
        this.canRendering = true;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        this.showCount += dt / 1000;
        if (this.showCount >= this.showTime) {
            this.ai.changeState(`interval`);
        }
        return true;
    }

    /**
     * Render entity by this state
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        this.canRendering = false;
        this.entity.render(ctx, shiftX, shiftY);
        this.canRendering = true;
    }
}
