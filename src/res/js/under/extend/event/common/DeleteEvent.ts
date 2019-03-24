import { GameEvent } from "../../../base/event/common/GameEvent";
import { NamedEvent } from '../../../base/event/common/NamedEvent';
import { Context } from '../../../base/resources/image/Context';

/**
 * Delete event
 * - Deletes other event
 * @extends {GameEvent}
 * @classdesc Delete event to delete other event
 */
export class DeleteEvent extends GameEvent {
    /**
     * Event name to delte
     * @protected
     * @type {string}
     */
    protected name: string;

    /**
     * Delete event constructor
     * @constructor
     * @param {string} name Event name to delte
     */
    constructor(name: string) {
        super();

        this.name = name;
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        if (this.op !== null) {
            const removes = [];
            for (const it of this.op.getRunningEvents()) {
                if (it instanceof NamedEvent) {
                    if (it.getName() === this.name) {
                        removes.push(it);
                    }
                }
            }
            for (const it of removes) {
                this.op.delete(it);
            }
            this.op.next();
        }
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
    update(_dt: number): boolean {
        return true;
    }
    /**
     * Render event
     * @override
     * @param {Context} ctx Canvas context
     */
    render(_ctx: Context) { }
}
