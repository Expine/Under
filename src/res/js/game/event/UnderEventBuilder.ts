import { SimpleEventBuilder } from "../../under/extend/event/parser/SimpleEventBuilder";
import { TextWindowEvent } from "./common/TextWindowEvent";
import { GameEvent } from "../../under/base/event/common/GameEvent";
import { CameraChangeEvent } from "./onstage/CameraChangeEvent";
import { RepulsionResponse } from "../../under/extend/stage/physics/RepulsionResponse";
import { ImpulseBasedResponse } from "../../under/extend/stage/physics/ImpulseBasedResponse";
import { PhysicalChangeEvent } from "./onstage/PhysicalChangeEvent";
import { LinkEvent } from "./common/LinkEvent";
import { UnderRepulsionResponse } from "../stage/physics/UnderRepulsionResponse";

/**
 * Simple event builder
 * - Gemerates under event
 * @extends {SimpleEventBuilder}
 * @classdesc Simple event builder to generate simple event
 */
export class UnderEventBuilder extends SimpleEventBuilder {
    /**
     * Make event
     * @protected
     * @param {any} event Event json data
     * @return {GameEvent} Event
     */
    makeEvent(event: any): GameEvent | null {
        switch (event.type) {
            case 'talkwindow':
                return new TextWindowEvent(event.name, event.x, event.y, event.sentence, event.size);
            case 'changeCamera':
                return new CameraChangeEvent(event.camera, event.moving, event.cliping);
            case 'changePhysical':
                let response = null;
                switch (event.physical) {
                    case 'under':
                        response = new UnderRepulsionResponse();
                        break;
                    case 'repulsion':
                        response = new RepulsionResponse();
                        break;
                    case 'impulse':
                        response = new ImpulseBasedResponse();
                        break;
                }
                return response === null ? null : new PhysicalChangeEvent(response);
            case 'link':
                return new LinkEvent(event.url);
            default:
                return super.makeEvent(event);
        }
    }
}
