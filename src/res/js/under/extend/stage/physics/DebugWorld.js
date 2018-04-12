/**
 * Debug world
 * - Performs a physical operation
 * - Registers entities and apply a physical operation
 * - Continually perform collision processing
 * - ### Measure time for debugging
 * @implements {SequentialWorld}
 * @classdesc Debug world to measure time for debugging
 */
class DebugWorld extends SequentialWorld { // eslint-disable-line  no-unused-vars
    /**
     * Update external force
     * @protected
     * @override
     * @param {number} dt Delta time
     */
    updateExternalForce(dt) {
        Timer.it.startTimer(`external`);
        super.updateExternalForce(dt);
        Timer.it.stopTimer(`external`);
    }

    /**
     * Update body
     * @protected
     * @override
     * @param {number} dt Delta time
     */
    updateBody(dt) {
        Timer.it.startTimer(`body`);
        super.updateBody(dt);
        Timer.it.stopTimer(`body`);
    }

    /**
     * Update collisions
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateCollision(dt) {
        Timer.it.startTimer(`collide`);
        super.updateCollision(dt);
        Timer.it.stopTimer(`collide`);
    }

    /**
     * Update collisions response
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateResponse(dt) {
        Timer.it.startTimer(`response`);
        super.updateResponse(dt);
        Timer.it.stopTimer(`response`);
    }
}
