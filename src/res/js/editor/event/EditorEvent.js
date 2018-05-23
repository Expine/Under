/**
 * Editor event
 * - Updates and renders event
 * - Identified by name
 * - It can save data
 * - Controls the stage
 * - ### Enables to use in editor
 * @extends {NamedEvent}
 * @implements {IEditorSave}
 * @implements {IStageEvent}
 * @classdesc Editor event to enable to use in editor
 */
class EditorEvent extends NamedEvent /* , IEditorSave, IStageEvent */ { // eslint-disable-line  no-unused-vars
    /**
     * Editor event constructor
     * @constructor
     * @param {GameEvent} baseEvent Base event
     */
    constructor(baseEvent) {
        super();

        /**
         * Base event
         * @protected
         * @type{GameEvent}
         */
        this.baseEvent = baseEvent;
    }

    /**
     * Unparse from input order to json
     * @protected
     * @param {InputOrder} order Traget input order
     * @return {JSON} JSON data
     */
    unparseInputOrder(order) {
        const ret = {};
        if (order instanceof DirectionInputOrder) {
            if (order.directionX === 1) {
                ret.type = `right`;
            } else if (order.directionX === -1) {
                ret.type = `left`;
            } else if (order.directionY === 1) {
                ret.type = `down`;
            } else if (order.directionY === -1) {
                ret.type = `up`;
            }
            ret.time = order.time;
        } else if (order instanceof WaitInputOrder) {
            ret.type = `wait`;
            ret.time = order.time;
        } else if (order instanceof LoopInputOrder) {
            ret.type = `loop`;
            ret.number = order.loopNumber;
            ret.orders = [];
            for (const it of order.orders) {
                ret.orders.push(this.unparseInputOrder(it));
            }
        }
        return ret;
    }

    /**
     * Unparses from event to json
     * @protected
     * @param {GameEvent} event Event to unparse
     * @return {JSON} Json data
     */
    unparse(event) {
        const ret = {};
        if (event instanceof AutoInputEvent) {
            ret.type = `auto`;
            ret.orders = [];
            for (const it of event.orders) {
                ret.orders.push(this.unparseInputOrder(it));
            }
        } else if (event instanceof DelayEvent) {
            ret.type = `delay`;
            ret.delay = event.delay;
        } else if (event instanceof DeleteEvent) {
            ret.type = `delete`;
            ret.name = event.name;
        } else if (event instanceof ImageEvent) {
            ret.type = `image`;
            ret.name = event.name;
            ret.x = event.x;
            ret.y = event.y;
        } else if (event instanceof CameraEvent) {
            ret.type = `camera`;
            ret.name = event.name;
            ret.x = event.toX;
            ret.y = event.toY;
        } else if (event instanceof ControlEntityEvent) {
            ret.type = `control`;
            ret.target = event.targetName;
            if (event.vx !== 0 || event.vy !== 0) {
                ret.vx = event.vx;
                ret.vy = event.vy;
            }
            if (event.fx !== 0 || event.fy !== 0) {
                ret.fx = event.fx;
                ret.fy = event.fy;
            }
        } else if (event instanceof StageStopEvent) {
            ret.type = `stop`;
            ret.name = event.name;
        } else if (event instanceof TalkEvent) {
            ret.type = `talk`;
            ret.sentence = event.sentence;
        } else if (event instanceof TransitionalEvent) {
            ret.type = `transition`;
            ret.stage = event.stage;
            ret.replace = event.isReplace;
        } else if (event instanceof WaitKeyEvent) {
            ret.type = `waitkey`;
        } else if (event instanceof LinkEvent) {
            ret.type = `link`;
            ret.url = event.url;
        } else if (event instanceof TextWindowEvent) {
            ret.type = `talkwindow`;
            ret.name = event.name;
            ret.x = event.x;
            ret.y = event.y;
            ret.sentence = event.sentence;
            ret.size = event.size;
        } else if (event instanceof CameraChangeEvent) {
            ret.type = `changeCamera`;
            ret.camera = event.type;
            ret.moving = event.isMoving;
            ret.cliping = event.isCliping;
        } else if (event instanceof PhysicalChangeEvent) {
            ret.type = `changePhysical`;
            ret.physical = event.response instanceof UnderRepulsionResponse ? `under` : event.response instanceof RepulsionResponse ? `repulsion` : `impulse`;
        } else if (event instanceof SequentialEvent) {
            ret.type = `sequential`;
            ret.events = [];
            for (const it of event.events) {
                ret.events.push(this.unparse(it));
            }
        }
        return ret;
    }

    /**
     * Get json data for saving
     * @override
     * @return {JSON} Json data for saving
     */
    getSaveData() {
        return this.unparse(this.baseEvent);
    }

    /**
     * Set stage
     * @override
     * @param {Stage} stage Stage to set
     */
    setStage(stage) {
        if (BaseUtil.implementsOf(this.baseEvent, IStageEvent)) {
            this.baseEvent.setStage(stage);
        }
    }

    /**
     * Get event's identified name
     * @override
     * @return {string} Identified name
     */
    getName() {
        return this.baseEvent instanceof NamedEvent ? this.baseEvent.getName() : null;
    }

    /**
     * Set event operator
     * @override
     * @param {IEventOperator} op Event operator
     */
    setEventOperator(op) {
        super.setEventOperator(op);
        this.baseEvent.setEventOperator(op);
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        this.baseEvent.init();
    }

    /**
     * Destructor of event
     * @override
     */
    destruct() {
        this.baseEvent.destruct();
    }

    /**
     * Update event
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether update is endped or not
     */
    update(dt) {
        return this.baseEvent.update(dt);
    }

    /**
     * Render event
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        this.baseEvent.render(ctx);
    }
}
