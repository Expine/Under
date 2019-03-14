import { Context } from "../resources/image/Context";

/**
 * Stage manager
 * - Manages stage
 * @abstract
 * @classdesc Stage manager to manage stage
 */
export abstract class StageManager {
    /**
     * Stage manager singleton instance
     * @type {StageManager}
     */
    static it: StageManager;

    /**
     * Stage parser
     * @protected
     * @type {StageParser}
     */
    protected parser: StageParser = null;

    /**
     * Stage width
     * @protected
     * @type {number}
     */
    protected width: number = 0;
    /**
     * Stage height
     * @protected
     * @type {number}
     */
    protected height: number = 0;

    /**
     * Stage manager constructor
     * @constructor
     */
    constructor() {
        // set singleton
        StageManager.it = this;

        this.parser = null;

        this.width = 0;
        this.height = 0;
    }

    /**
     * Set stage parser
     * @param {StageParser} parser Stage parser
     */
    setStageParser(parser: StageParser) {
        this.parser = parser;
    }

    /**
     * Set stage size
     * @param {number} width Stage width
     * @param {number} height Stage height
     */
    setStageSize(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    /**
     * Replace currently stage
     * @param {string} stageName Stage name
     */
    replaceStage(stageName: string) {
        this.popStage();
        this.pushStage(stageName);
    }

    /**
     * Replace currently stage
     * @param {Stage} stage Stage instance
     */
    replaceStageDirectry(stage: Stage) {
        this.popStage();
        this.pushStageDirectly(stage);
    }

    /**
     * Push stage to list
     * @abstract
     * @param {string} stageName Stage name
     */
    pushStage(stageName: string) { }

    /**
     * Push stage to list
     * @abstract
     * @param {Stage} stage Stage instance
     */
    pushStageDirectly(stage: Stage) { }

    /**
     * Pop stage from list
     * @abstract
     * @return {Stage} Stage that is popped from list
     */
    popStage(): Stage { }

    /**
     * Get stage
     * @abstract
     * @return {Stage} Currently stage
     */
    getStage(): Stage { }

    /**
     * Update stage
     * @param {number} dt Delta time
     */
    update(dt: number) {
        const stage = this.getStage();
        if (stage !== null) {
            stage.update(dt);
        }
    }

    /**
     * Render stage
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx: Context, shiftX: number = 0, shiftY: number = 0) {
        const stage = this.getStage();
        if (stage !== null) {
            stage.render(ctx, shiftX, shiftY);
        }
    }
}
