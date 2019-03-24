import { State } from "../../../../../base/stage/ai/state/State";
import { Context } from "../../../../../base/resources/image/Context";

/**
 * Vanish state
 * - Showes entity
 * @extends {State}
 * @classdesc Vanish state to show entity
 */
export class ShowState extends State {
    /**
     * Showing time
     * @protected
     * @type {number}
     */
    protected showTime: number;
    /**
     * Showing count
     * @protected
     * @type {number}
     */
    protected showCount: number;

    /**
     * Vanish state constructor
     * @constructor
     * @param {number} showTime Showing time
     */
    constructor(showTime: number) {
        super();

        this.showTime = showTime;
        this.showCount = 0;
    }

    /**
     * Initialize
     * @override
     */
    init() {
        if (this.entity !== null && this.entity.collider !== null) {
            this.entity.collider.enable = true;
        }
        this.showCount = 0;
        this.canRendering = true;
    }

    /**
     * Update state
     * @override
     * @param {number} dt Delta time
     */
    update(_dt: number) { }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt: number): boolean {
        this.showCount += dt / 1000;
        if (this.showCount >= this.showTime && this.ai !== null) {
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
    render(ctx: Context, shiftX: number = 0, shiftY: number = 0) {
        this.canRendering = false;
        if (this.entity !== null) {
            this.entity.render(ctx, shiftX, shiftY);
        }
        this.canRendering = true;
    }
}
