/**
 * Autonomy entity
 * - Object present on the stage that has coordinate and size
 * - Has image ID
 * - It can be collided because it has material and collider
 * - ### It is not fixed and can be moved
 * - ### It can move by AI
 * @implements {MutableEntity}
 * @classdesc Autonomy entity to move by AI
 */
class AutonomyEntitiy extends MutableEntity { // eslint-disable-line  no-unused-vars
    /**
     * Add AI system
     * @interface
     * @param {AI} ai AI to control this
     * @param {number} priority priority of AI
     */
    addAI(ai, priority) {}

    /**
     * Remove AI system
     * @interface
     * @param {AI} ai AI to control this
     */
    removeAI(ai) {}
}
