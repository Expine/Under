/**
 * Delete event
 * - Updates and renders event
 * - ### Deletes other event
 * @extends {GameEvent}
 * @classdesc Delete event to delete other event
 */
class DeleteEvent extends GameEvent {
    /**
     * Delete event constructor
     * @constructor
     * @param {string} name Event name to delte
     */
    constructor(name) {
        super();

        /**
         * Event name to delte
         * @protected
         * @type {string}
         */
        this.name = name;
    }

    /**
     * Initialize event
     * @override
     */
    init() {
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
