import { IBreakable } from "../../../../base/stage/entity/interface/IBreakable";
import { ImmutableEvent } from "./ImmutableEvent";
import { isIStageEvent } from "../../../../base/event/onstage/IStageEvent";
import { EventManager } from "../../../../base/event/EventManager";

/**
 * Once event entity
 * - Fire event once
 * @extends {ImmutableEvent}
 * @implements {IEventEntity}
 * @implements {IColliderable}
 * @classdesc Once event entity to fire event
 */
export class OnceEventEntity extends ImmutableEvent implements IBreakable {
    /**
     * Destroy object
     * @override
     */
    destroy() {
        if (this.stage !== null) {
            this.stage.removeEntity(this);
        }
    }

    /**
     * Fires event
     * @override
     */
    fire() {
        if (this.stage !== null && isIStageEvent(this.event)) {
            this.event.setStage(this.stage);
        }
        if (this.event !== null) {
            EventManager.it.register(this.event);
        }
        this.destroy();
    }
}
