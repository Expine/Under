import { IEventOperator } from "../IEventOperater";
import { Context } from "../../resources/image/Context";

/**
 * Game event
 * - Updates and renders event
 * @abstract
 * @classdesc Game event to update and render event
 */
export abstract class GameEvent {
    /**
     * Event operator
     * @protected
     * @type {IEventOperator}
     */
    protected op: IEventOperator | null;

    /**
     * Game event constructor
     * @constructor
     */
    constructor() {
        this.op = null;
    }

    /**
     * Set event operator
     * @override
     * @param {IEventOperator} op Event operator
     */
    setEventOperator(op: IEventOperator) {
        this.op = op;
    }

    /**
     * Initialize event
     * @abstract
     */
    abstract init(): void;

    /**
     * Destructor of event
     * @abstract
     */
    abstract destruct(): void;

    /**
     * Update event
     * @abstract
     * @param {number} dt Delta time
     * @return {boolean} Whether update is endped or not
     */
    abstract update(dt: number): boolean;

    /**
     * Render event
     * @abstract
     * @param {Context} ctx Canvas context
     */
    abstract render(ctx: Context): void;
}
