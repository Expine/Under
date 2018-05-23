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
        switch (event.type) {
            case `talkwindow`:
                return new TextWindowEvent(event.name, event.x, event.y, event.sentence, event.size);
            case `changeCamera`:
                return new CameraChangeEvent(event.camera, event.moving, event.cliping);
            case `changePhysical`:
                let response = null;
                switch (event.physical) {
                    case `under`:
                        response = new UnderRepulsionResponse();
                        break;
                    case `repulsion`:
                        response = new RepulsionResponse();
                        break;
                    case `impulse`:
                        response = new ImpulseBasedResponse();
                        break;
                }
                return new PhysicalChangeEvent(response);
            case `link`:
                return new LinkEvent(event.url);
            default:
                return super.makeEvent(event);
        }
    }
}
