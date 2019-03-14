/**
 * Under debug engine
 * - Control the core of the game
 * - Manages each piece of game information
 * - Fires update and rendering processing respectively
 * - Executes the main loop by requestAnimationFrame
 * - ### Measure time for debugging
 * @extends {UnderEngine}
 * @classdesc Under debug engine to measure time for debugging
 */
class UnderDebugEngine extends UnderEngine {
    /**
     * Update in main loop
     * @override
     * @protected
     */
    update() {
        this.timer.startTimer(`overall`);
        this.timer.startTimer(`update`);
        super.update();
        this.timer.stopTimer(`update`);
    }

    /**
     * Rendering in main loop
     * @override
     * @protected
     */
    render() {
        this.timer.startTimer(`render`);
        super.render();
        this.timer.stopTimer(`render`);
        this.timer.stopTimer(`overall`);
    }
}
