/**
 * Event builder
 * - Generates event from json data
 * - ### Generate simple event
 * @extends {EventBuilder}
 * @classdesc Event builder to generate simple event
 */
class SimpleEventBuilder extends EventBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Load event image
     * @protected
     * @param {string} path Event image path
     * @return {number} Event image ID
     */
    loadEventImage(path) {
        return ResourceManager.image.load(`event/${path}`);
    }

    /**
     * Make input order
     * @protected
     * @param {JSON} order Order json data
     * @return {InpurOrder} Input order
     */
    makeInputOrder(order) {
        switch (order.type) {
            case `up`:
                return new DirectionInputOrder(order.time, 0, -1);
            case `down`:
                return new DirectionInputOrder(order.time, 0, 1);
            case `right`:
                return new DirectionInputOrder(order.time, 1, 0);
            case `left`:
                return new DirectionInputOrder(order.time, -1, 0);
            case `wait`:
                return new WaitInputOrder(order.time);
            case `loop`:
                {
                    let ret = new LoopInputOrder(order.number);
                    for (let it of order.orders) {
                        ret.addOrder(this.makeInputOrder(it));
                    }
                    return ret;
                }
        }
    }

    /**
     * Make event
     * @protected
     * @param {JSON} event Event json data
     * @return {GameEvent} Event
     */
    makeEvent(event) {
        switch (event.type) {
            case `talk`:
                return new TalkEvent(event.sentence);
            case `waitkey`:
                return new WaitKeyEvent();
            case `image`:
                return new ImageEvent(event.name, this.loadEventImage(event.file), event.x, event.y, event.width, event.height);
            case `delete`:
                return new DeleteEvent(event.name);
            case `delay`:
                return new DelayEvent(event.delay);
            case `stop`:
                return new StageStopEvent(event.name);
            case `transition`:
                return new TransitionalEvent(event.stage, event.replace);
            case `auto`:
                {
                    let ret = new AutoInputEvent();
                    for (let it of event.orders) {
                        ret.addOrder(this.makeInputOrder(it));
                    }
                    return ret;
                }
            case `control`:
                {
                    let ret = new ControlEntityEvent();
                    ret.setTarget(event.target);
                    if (event.vx !== undefined && event.vy !== undefined) {
                        ret.setVelocity(event.vx, event.vy);
                    }
                    if (event.fx !== undefined && event.fy !== undefined) {
                        ret.setForce(event.fx, event.fy);
                    }
                    return ret;
                }
            case `camera`:
                return new CameraEvent(event.name, event.x, event.y);
            case `sequential`:
                {
                    let ret = new SequentialEvent();
                    for (let it of event.events) {
                        if (BaseUtil.implementsOf(this.makeEvent(it), IStageEvent)) {
                            ret = new SequentialStageEvent();
                            break;
                        }
                    }
                    for (let it of event.events) {
                        ret.addEvent(this.makeEvent(it));
                    }
                    return ret;
                }
        }
    }

    /**
     * Build event from json data
     * @abstract
     * @param {JSON} json Event json data
     * @return {GameEvent} Generated event
     */
    build(json) {
        return this.makeEvent(json);
    }
}
