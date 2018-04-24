/**
 * Delete event
 * - Updates and renders event
 * - ### Deletes other event
 * @classdesc Delete event to delete other event
 */
class DeleteEvent extends GameEvent { // eslint-disable-line  no-unused-vars
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
        super.init();
        for (let it of this.op.getRunningEventsByName(this.name)) {
            this.op.stopUpdate(it);
            this.op.stopRender(it);
        }
        this.op.stopUpdate(this);
        this.op.stopRender(this);
        this.op.next();
    }
}
