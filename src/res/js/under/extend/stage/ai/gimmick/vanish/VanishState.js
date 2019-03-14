/**
 * Vanish state
 * - Determines the operation by AI according to the state and renders based on state
 * - ### Vanishes entity
 * @extends {State}
 * @classdesc Vanish state to vanish entity
 */
class VanishState extends State {
    /**
     * Vanish state constructor
     * @constructor
     * @param {number} hideTime Hiding time
     * @param {boolean} isShowingNext Whether to show next
     */
    constructor(hideTime, isShowingNext) {
        super();

        /**
         * Hiding time
         * @protected
         * @type {number}
         */
        this.hideTime = hideTime;
        /**
         * Whether to show next
         * @protected
         * @type {boolean}
         */
        this.isShowingNext = isShowingNext;
        /**
         * Hiding count
         * @protected
         * @type {number}
         */
        this.hideCount = 0;
    }

    /**
     * Initialize
     * @override
     */
    init() {
        this.entity.collider.enable = false;
        this.hideCount = 0;
        this.canRendering = true;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        this.hideCount += dt / 1000;
        if (this.hideCount >= this.hideTime) {
            this.ai.changeState(this.isShowingNext ? `show` : `vanish`);
        }
        return true;
    }
}
