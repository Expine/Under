import { StageEvent } from "../../../base/event/onstage/StageEvent";
import { Input } from "../../../base/input/Input";
import { Context } from "../../../base/resources/image/Context";

/**
 * Wait key event
 * - Waits to input key
 * @extends {StageEvent}
 * @classdesc Wait key event to wait to input key
 */
export class WaitKeyEvent extends StageEvent {
    /**
     * Initialize event
     * @override
     */
    init() {
        if (this.stage !== null) {
            this.stage.setEnable(false);
        }
    }

    /**
     * Destructor of event
     * @override
     */
    destruct() {
        if (this.stage !== null) {
            this.stage.setEnable(true);
        }
    }

    /**
     * Update event
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether update is endped or not
     */
    update(_dt: number): boolean {
        if (Input.key.isPress(Input.key.yes()) && this.op !== null) {
            this.op.next();
            return true;
        }
        return false;
    }

    /**
     * Render event
     * @param {Context} ctx Canvas context
     */
    render(_ctx: Context) { }
}
