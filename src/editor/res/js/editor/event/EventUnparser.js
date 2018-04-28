// TODO: Should be implement by Inheritance
/**
 * Event unparser
 * - ### Unparses from event to json
 * @classdesc Event unparser to unparse from event to json
 */
class EventUnparser { // eslint-disable-line  no-unused-vars
    /**
     * Unparses from event to json
     * @param {GameEvent} event Event to unparse
     * @return {JSON} Json data
     */
    static unparse(event) {
        let ret = {};
        if (event instanceof TalkEvent) {
            ret.type = `talk`;
            ret.sentence = event.sentence;
        } else if (event instanceof WaitKeyEvent) {
            ret.type = `waitkey`;
        } else if (event instanceof ImageEvent) {
            ret.type = `image`;
            ret.name = event.name;
            ret.x = event.x;
            ret.y = event.y;
            ret.file = ResourceManager.image.getPath(event.imageID).replace(`event/`, ``);
        } else if (event instanceof DeleteEvent) {
            ret.type = `delete`;
            ret.name = event.name;
        } else if (event instanceof DelayEvent) {
            ret.type = `delay`;
            ret.delay = event.delay;
        } else if (event instanceof StageStopEvent) {
            ret.type = `stop`;
        } else if (event instanceof StageRestoreEvent) {
            ret.type = `restore`;
        } else if (event instanceof TransitionalEvent) {
            ret.type = `transition`;
            ret.stage = event.stage;
            ret.replace = event.isReplace;
        } else if (event instanceof TextWindowEvent) {
            ret.type = `talkwindow`;
            ret.name = event.name;
            ret.x = event.x;
            ret.y = event.y;
            ret.sentence = event.sentence;
            ret.size = event.size;
        } else if (event instanceof AutoInputEvent) {
            ret.type = `auto`;
            ret.orders = [];
            for (let it of event.orders) {
                ret.orders.push(it);
            }
        } else if (event instanceof ControlEntityEvent) {
            ret.type = `control`;
            ret.target = event.target;
            ret.vx = event.vx;
            ret.vy = event.vy;
            ret.fx = event.fx;
            ret.fy = event.fy;
        } else if (event instanceof SequentialEvent) {
            ret.type = `sequential`;
            ret.events = [];
            for (let it of event.events) {
                ret.events.push(EventUnparser.unparse(it));
            }
        }
        return ret;
    }
}
