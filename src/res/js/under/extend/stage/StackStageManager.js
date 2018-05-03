/**
 * Stack stage manager
 * - Manages stage
 * - ### Uses the stack
 * @interface
 * @implements {StageManager}
 * @classdesc Stack stage manager to ues the stack
 */
class StackStageManager extends StageManager { // eslint-disable-line  no-unused-vars
    /**
     * Stage manager constructor
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
    }

    /**
     * Push stage to list
     * @override
     * @param {string} stage Stage name
     */
    pushStage(stage) {
        let ins = this.parser.parse(`src/res/stage/${stage}.json`, Screen.it.width, Screen.it.height);
        ins.init();
        this.stageStack.push(ins);
    }

    /**
     * Replace currently stage
     * @override
     * @param {string} stage Stage name
     */
    replaceStage(stage) {
        if (this.stageStack.length == 0) {
            this.pushStage(stage);
        } else {
            let ins = this.parser.parse(`src/res/stage/${stage}.json`, Screen.it.width, Screen.it.height);
            ins.init();
            this.stageStack[this.stageStack.length - 1] = ins;
        }
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
        return this.stageStack == 0 ? null : this.stageStack[this.stageStack.length - 1];
    }
}
