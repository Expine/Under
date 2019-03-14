/**
 * Stack stage manager
 * - Manages stage
 * - ### Uses the stack
 * @extends {StageManager}
 * @classdesc Stack stage manager to ues the stack
 */
class StackStageManager extends StageManager {
    /**
     * Stack stage manager constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Stack of stages
         * @protected
         * @type {Array<Stage>}
         */
        this.stageStack = [];
        /**
         * Current stage to transfer information
         * @protected
         * @type {Stage}
         */
        this.currentStage = null;
    }

    /**
     * Push stage to list
     * @override
     * @param {string} stageName Stage name
     */
    pushStage(stageName) {
        const stage = this.parser.parse(`src/res/stage/${stageName}.json`, this.width, this.height);
        if (this.currentStage !== null) {
            // take over information
            for (let target of this.currentStage.getEntitiesByInterface(ITakeOver)) {
                for (let dst of stage.getEntitiesByInterface(ITakeOver)) {
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

    /**
     * Push stage to list
     * @override
     * @param {Stage} stage Stage instance
     */
    pushStageDirectly(stage) {
        this.stageStack.push(stage);
        stage.init();
    }

    /**
     * Pop stage from list
     * @override
     * @return {Stage} Stage that is popped from list
     */
    popStage(stage) {
        return this.stageStack.pop();
    }

    /**
     * Get stage
     * @override
     * @return {Stage} Currently stage
     */
    getStage() {
        return this.stageStack.length === 0 ? null : this.stageStack[this.stageStack.length - 1];
    }
}
