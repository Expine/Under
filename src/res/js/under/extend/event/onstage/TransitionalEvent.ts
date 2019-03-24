import { StageEvent } from "../../../base/event/onstage/StageEvent";
import { StageManager } from "../../../base/stage/StageManager";
import { Context } from "../../../base/resources/image/Context";

/**
 * Transitional event
 * - Transitions the stage
 * @extends {StageEvent}
 * @classdesc Transitional event to transition the stage
 */
export class TransitionalEvent extends StageEvent {
    /**
     * Stage name
     * @protected
     * @type {string}
     */
    protected stageName: string;
    /**
     * Whether scene is replaced or not
     * @protected
     * @type {boolean}
     */
    protected isReplace: boolean;

    /**
     * Transitional event constructor
     * @constructor
     * @param {string} stageName Stage name
     * @param {boolean} isReplace Whether scene is replaced or not
     */
    constructor(stageName: string, isReplace: boolean) {
        super();

        this.stageName = stageName;
        this.isReplace = isReplace;
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        if (this.isReplace) {
            StageManager.it.replaceStage(this.stageName);
        } else {
            StageManager.it.pushStage(this.stageName);
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
    update(_dt: number): boolean {
        return true;
    }

    /**
     * Render event
     * @param {Context} ctx Canvas context
     */
    render(_ctx: Context) { }
}
