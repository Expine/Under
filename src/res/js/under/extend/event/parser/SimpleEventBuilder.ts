import { EventBuilder } from "../../../base/event/parser/EventBuilder";
import { GameImage } from "../../../base/resources/image/GameImage";
import { InputOrder } from "../common/inputorder/InputOrder";
import { DirectionInputOrder } from "../common/inputorder/DirectionInputOrder";
import { WaitInputOrder } from "../common/inputorder/WaitInputOrder";
import { LoopInputOrder } from "../common/inputorder/LoopInputOrder";
import { GameEvent } from "../../../base/event/common/GameEvent";
import { TalkEvent } from "../onstage/TalkEvent";
import { WaitKeyEvent } from "../onstage/WaitKeyEvent";
import { ImageEvent } from "../common/ImageEvent";
import { DeleteEvent } from "../common/DeleteEvent";
import { DelayEvent } from "../common/DelayEvent";
import { StageStopEvent } from "../onstage/StageStopEvent";
import { TransitionalEvent } from "../onstage/TransitionalEvent";
import { AutoInputEvent } from "../common/AutoInputEvent";
import { ControlEntityEvent } from "../onstage/ControlEntityEvent";
import { CameraEvent } from "../onstage/CameraEvent";
import { SequentialEvent } from "../common/SequentialEvent";
import { SequentialStageEvent } from "../onstage/SequentialStageEvent";
import { isIStageEvent } from "../../../base/event/onstage/IStageEvent";

/**
 * Event builder
 * - Generate simple event
 * @extends {EventBuilder}
 * @classdesc Event builder to generate simple event
 */
export class SimpleEventBuilder extends EventBuilder {
    /**
     * Make event image
     * @protected
     * @param {any} image Event image information json data
     * @return {GameImage} Event image
     */
    makeImage(image: any): GameImage | null {
        return this.imageBuilder === null ? null : this.imageBuilder.build('event', image);
    }

    /**
     * Make input order
     * @protected
     * @param {any} order Order json data
     * @return {InputOrder} Input order
     */
    makeInputOrder(order: any): InputOrder | null {
        switch (order.type) {
            case 'up':
                return new DirectionInputOrder(order.time, 0, -1);
            case 'down':
                return new DirectionInputOrder(order.time, 0, 1);
            case 'right':
                return new DirectionInputOrder(order.time, 1, 0);
            case 'left':
                return new DirectionInputOrder(order.time, -1, 0);
            case 'wait':
                return new WaitInputOrder(order.time);
            case 'loop':
                {
                    const ret = new LoopInputOrder(order.number);
                    for (const it of order.orders) {
                        const order = this.makeInputOrder(it);
                        if (order !== null) {
                            ret.addOrder(order);
                        }
                    }
                    return ret;
                }
        }
        return null;
    }

    /**
     * Make event
     * @protected
     * @param {any} json Event json data
     * @return {GameEvent} Event
     */
    makeEvent(event: any): GameEvent | null {
        switch (event.type) {
            case 'talk':
                return /*isTalkEventJSONData(event) ?*/ new TalkEvent(event.sentence);
            case 'waitkey':
                return new WaitKeyEvent();
            case 'image':
                return /*isImageEventJSONData(event) ?*/ new ImageEvent(event.name, event.x, event.y, this.makeImage(event.image));
            case 'delete':
                return /*isDeleteEventJSONData(event) ?*/ new DeleteEvent(event.name);
            case 'delay':
                return /*isDelayEventJSONData(event) ?*/ new DelayEvent(event.delay);
            case 'stop':
                return new StageStopEvent(event.name);
            case 'transition':
                return new TransitionalEvent(event.stage, event.replace);
            case 'auto':
                {
                    const ret = new AutoInputEvent();
                    for (const it of event.orders) {
                        const order = this.makeInputOrder(it);
                        if (order !== null) {
                            ret.addOrder(order);
                        }
                    }
                    return ret;
                }
            case 'control':
                {
                    const ret = new ControlEntityEvent(event.target);
                    if (event.vx !== undefined && event.vy !== undefined) {
                        ret.setVelocity(event.vx, event.vy);
                    }
                    if (event.fx !== undefined && event.fy !== undefined) {
                        ret.setForce(event.fx, event.fy);
                    }
                    return ret;
                }
            case 'camera':
                return new CameraEvent(event.name, event.x, event.y);
            case 'sequential':
                {
                    let ret = new SequentialEvent();
                    for (const it of event.events) {
                        const event = this.makeEvent(it);
                        if (event !== null && isIStageEvent(event)) {
                            ret = new SequentialStageEvent();
                            break;
                        }
                    }
                    for (const it of event.events) {
                        const event = this.makeEvent(it);
                        if (event !== null) {
                            ret.addEvent(event);
                        }
                    }
                    return ret;
                }
        }
        return null;
    }

    /**
     * Build event from json data
     * @abstract
     * @param {any} json Event json data
     * @return {GameEvent} Generated event
     */
    build(json: any): GameEvent | null {
        return this.makeEvent(json);
    }
}
