import { GameEvent } from "../../../base/event/common/GameEvent";
import { Context } from '../../../base/resources/image/Context';

/**
 * Delay event
 * - Delaies time
 * @extends {GameEvent}
 * @classdesc Delay event to delay time
 */
export class DelayEvent extends GameEvent {
    /**
     * Delay time
     * @protected
     * @type {number}
     */
    protected delay: number;

    /**
     * Delay count
     * @protected
     * @type {number}
     */
    protected count: number;

    /**
     * Delay event constructor
     * @constructor
     * @param {number} delay Delay time
     */
    constructor(delay: number) {
        super();

        this.delay = delay;
        this.count = 0;
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        this.count = 0;
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
        this.count += dt / 1000;
        if (this.count > this.delay) {
            if (this.op !== null) {
                this.op.next();
            }
            return true;
        }
        return false;
    }

    /**
     * Render event
     * @override
     * @param {Context} ctx Canvas context
     */
    render(_ctx: Context) { }
}
