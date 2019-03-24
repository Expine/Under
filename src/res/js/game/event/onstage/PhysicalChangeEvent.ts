import { Context } from "../../../under/base/resources/image/Context";
import { StageEvent } from "../../../under/base/event/onstage/StageEvent";
import { CollisionResponse } from "../../../under/base/stage/physics/CollisionResponse";

/**
 * Physical change event
 * - Changes physical type
 * @extends {StageEvent}
 * @classdesc Physical change event to change physical type
 */
export class PhysicalChangeEvent extends StageEvent {
    /**
     * Response for collision
     * @protected
     * @type {CollisionResponse}
     */
    protected response: CollisionResponse;

    /**
     * Physical change event constructor
     * @constructor
     * @param {CollisionResponse} response Response for collision
     */
    constructor(response: CollisionResponse) {
        super();
        this.response = response;
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        if (this.stage !== null) {
            const physic = this.stage.getPhysicalWorld();
            if (physic !== null) {
                physic.setResponse(this.response);
            }
        }
        if (this.op !== null) {
            this.op.next();
        }
    }

    /**
     * Destructor of event
     * @override
     */
    destruct() { }

    /**
     * Update event
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether update is endped or not
     */
    update(_dt: number): boolean { return true; }

    /**
     * Render event
     * @override
     * @param {Context} ctx Canvas context
     */
    render(_ctx: Context) { }
}
