import { StageManager } from "../../base/stage/StageManager";
import { Stage } from "../../base/stage/Stage";
import { isITakeOver } from "../../base/stage/entity/interface/ITakeOver";

/**
 * Stack stage manager
 * - Uses the stack
 * @extends {StageManager}
 * @classdesc Stack stage manager to ues the stack
 */
export class StackStageManager extends StageManager {
    /**
     * Stack of stages
     * @protected
     * @type {Array<Stage>}
     */
    protected stageStack: Array<Stage>;
    /**
     * Current stage to transfer information
     * @protected
     * @type {Stage}
     */
    protected currentStage: Stage | null;

    /**
     * Stack stage manager constructor
     * @constructor
     */
    constructor() {
        super();

        this.stageStack = [];
        this.currentStage = null;
    }

    /**
     * Push stage to list
     * @override
     * @param {string} stageName Stage name
     */
    pushStage(stageName: string) {
        if (this.parser !== null) {
            const stage = this.parser.parse(`src/res/stage/${stageName}.json`, this.width, this.height);
            if (this.currentStage !== null) {
                // take over information
                for (let target of this.currentStage.getEntitiesByInterface(isITakeOver)) {
                    for (let dst of stage.getEntitiesByInterface(isITakeOver)) {
                        if (target.equals(dst)) {
                            target.takeOver(dst);
                            break;
                        }
                    }
                }
            }
            this.currentStage = stage;
            this.pushStageDirectly(stage);
        }
    }

    /**
     * Push stage to list
     * @override
     * @param {Stage} stage Stage instance
     */
    pushStageDirectly(stage: Stage) {
        this.stageStack.push(stage);
        stage.init();
    }

    /**
     * Pop stage from list
     * @override
     * @return {Stage} Stage that is popped from list
     */
    popStage(): Stage | null {
        const popedStage = this.stageStack.pop();
        return popedStage === undefined ? null : popedStage;
    }

    /**
     * Get stage
     * @override
     * @return {Stage} Currently stage
     */
    getStage(): Stage | null {
        return this.stageStack.length === 0 ? null : this.stageStack[this.stageStack.length - 1];
    }
}
