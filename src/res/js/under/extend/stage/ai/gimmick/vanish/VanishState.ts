import { State } from "../../../../../base/stage/ai/state/State";
import { Context } from "../../../../../base/resources/image/Context";

/**
 * Vanish state
 * - Vanishes entity
 * @extends {State}
 * @classdesc Vanish state to vanish entity
 */
export class VanishState extends State {
    /**
     * Hiding time
     * @protected
     * @type {number}
     */
    protected hideTime: number;
    /**
     * Whether to show next
     * @protected
     * @type {boolean}
     */
    protected isShowingNext: boolean;
    /**
     * Hiding count
     * @protected
     * @type {number}
     */
    protected hideCount: number;

    /**
     * Vanish state constructor
     * @constructor
     * @param {number} hideTime Hiding time
     * @param {boolean} isShowingNext Whether to show next
     */
    constructor(hideTime: number, isShowingNext: boolean) {
        super();

        this.hideTime = hideTime;
        this.isShowingNext = isShowingNext;
        this.hideCount = 0;
    }

    /**
     * Initialize
     * @override
     */
    init() {
        if (this.entity !== null && this.entity.collider !== null) {
            this.entity.collider.enable = false;
        }
        this.hideCount = 0;
        this.canRendering = true;
    }

    /**
     * Update state
     * @abstract
     * @param {number} dt Delta time
     */
    update(_dt: number) { };

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt: number): boolean {
        this.hideCount += dt / 1000;
        if (this.hideCount >= this.hideTime && this.ai !== null) {
            this.ai.changeState(this.isShowingNext ? 'show' : 'vanish');
        }
        return true;
    }

    /**
     * Render entity by this state
     * @abstract
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    render(_ctx: Context, _shiftX: number, _shiftY: number) { };
}
