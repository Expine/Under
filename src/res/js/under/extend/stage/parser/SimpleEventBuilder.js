/**
 * Event builder
 * - Generates event from json data
 * - ### Generate simple event
 * @implements {EventBuilder}
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
     * Make event
     * @protected
     * @param {JSON} event Event json data
     * @return {Event} Event
     */
    makeEvent(event) {
        if (event.type == `talk`) {
            return new TalkEvent(event.sentence);
        } else if (event.type == `waitkey`) {
            return new WaitKeyEvent();
        } else if (event.type == `image`) {
            return new ImageEvent(event.name, event.x, event.y, this.loadEventImage(event.file));
        } else if (event.type == `delete`) {
            return new DeleteEvent(event.name);
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
