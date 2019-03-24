import { TransferableState } from "../state/TransferableState";
import { Util } from "../../../../under/extend/util/Util";

/**
 * Under player state
 * - Render entity by entity own image ID for change type
 * @interface
 * @extends {TransferableState}
 * @classdesc Under player state to render entity by entity own image ID
 */
export abstract class UnderPlayerState extends TransferableState {
    /**
     * Transition usual state such as stationary, walk, fall
     * @protected
     */
    transitionUsualState() {
        if (this.entity === null || this.ai === null) {
            return;
        }
        if (!Util.onGround(this.entity)) {
            this.ai.changeState(`fall`);
        } else if (this.entity.body !== null && Math.abs(this.entity.body.velocityX) < 100) {
            this.ai.changeState(`stationary`);
        } else {
            this.ai.changeState(`walk`);
        }
    }
}
