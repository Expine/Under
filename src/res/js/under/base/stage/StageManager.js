/**
 * Stage manager
 * - ### Manages stage
 * @interface
 * @classdesc Stage manager to manage stage
 */
class StageManager { // eslint-disable-line  no-unused-vars
    /**
     * Stage manager constructor
     * @constructor
     */
    constructor() {
        // set singleton
        StageManager.it = this;

        /**
         * Stage parser
         * @protected
         * @type {StageParser}
         */
        this.parser = null;

        /**
         * Stage width
         * @protected
         * @type {number}
         */
        this.width = 0;
        /**
         * Stage height
         * @protected
         * @type {number}
         */
        this.height = 0;
    }

    /**
     * Set stage parser
     * @param {StageParser} parser Stage parser
     */
    setStageParser(parser) {
        this.parser = parser;
    }

    /**
     * Set stage size
     * @param {number} width Stage width
     * @param {number} height Stage height
     */
    setStageSize(width, height) {
        this.width = width;
        this.height = height;
    }

    /**
     * Push stage to list
     * @abstract
     * @param {string} stageName Stage name
     */
    pushStage(stageName) {}

    /**
     * Replace currently stage
     * @param {string} stageName Stage name
     */
    replaceStage(stageName) {
        this.popStage();
        this.pushStage(stageName);
    }

    /**
     * Pop stage from list
     * @abstract
     * @return {Stage} Stage that is popped from list
     */
    popStage() {}

    /**
     * Get stage
     * @abstract
     * @return {Stage} Currently stage
     */
    getStage() {}

    /**
     * Update stage
     * @param {number} dt Delta time
     */
    update(dt) {
        let stage = this.getStage();
        if (stage != null) {
            stage.update(dt);
        }
    }

    /**
     * Render stage
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        let stage = this.getStage();
        if (stage != null) {
            stage.render(ctx, shiftX, shiftY);
        }
    }
}

/**
 * Stage manager singleton instance
 * @type {StageManager}
 */
StageManager.it = null;
