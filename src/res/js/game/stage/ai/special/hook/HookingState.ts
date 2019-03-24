import { IHook, isIHook } from "../../../entity/interface/IHook";
import { State } from "../../../../../under/base/stage/ai/state/State";
import { Context } from "../../../../../under/base/resources/image/Context";

/**
 * Hooking state
 * - Hook condition before collision to create post hook
 * @extends {State}
 * @classdesc Hooking state before collision to create post hook
 */
export class HookingState extends State {
    /**
     * Hook for getting hook information
     * @protected
     * @type {IHook}
     */
    protected hook: IHook | null;

    /**
     * Hooking state
     * @constructor
     */
    constructor() {
        super();

        /**
         * Hook for getting hook information
         * @protected
         * @type {IHook}
         */
        this.hook = null;
    }

    /**
     * Initialize
     * @override
     */
    init() {
        if (isIHook(this.entity)) {
            this.hook = this.entity;
        }
    }

    /**
     * Update state
     * @abstract
     * @param {number} dt Delta time
     */
    update(_dt: number) { }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(_dt: number): boolean {
        if (this.hook !== null) {
            this.hook.createPost();
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
    render(_ctx: Context, _shiftX: number, _shiftY: number) { }
}
