import { State } from "../../../../base/stage/ai/state/State";
import { NamedAnimation } from "../../../../base/resources/image/NamedAnimation";

/**
 * Base State
 * - Initialize state image
 * @interface
 * @extends {State}
 * @classdesc Base state to initialize state image
 */
export abstract class BaseState extends State {
    /**
     * Initialize
     * @override
     */
    init() {
        // set image
        if (this.entity !== null && this.ai !== null) {
            const image = this.entity.getImage();
            if (image !== null && image instanceof NamedAnimation) {
                image.setName(this.ai.getStateID());
                image.init();
            }
        }
    }
}
