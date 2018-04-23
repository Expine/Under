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
        }
        return ret;
    }
}
