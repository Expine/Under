/**
 * Simple event builder
 * - Generates event from json data
 * - Generate simple event
 * - ### Gemerates under event
 * @extends {SimpleEventBuilder}
 * @classdesc Simple event builder to generate simple event
 */
class UnderEventBuilder extends SimpleEventBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Make event
     * @protected
     * @param {JSON} event Event json data
     * @return {Event} Event
     */
    makeEvent(event) {
        if (event.type == `talkwindow`) {
            return new TextWindowEvent(event.name, event.x, event.y, event.sentence, event.size);
        } else {
            return super.makeEvent(event);
        }
    }
}
