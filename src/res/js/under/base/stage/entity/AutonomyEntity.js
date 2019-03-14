/**
 * Autonomy entity
 * - Object present on the stage that has coordinate and size
 * - Manages image
 * - It can be collided because it has material and collider
 * - It is not fixed and can be moved
 * - ### It can move by AI
 * @interface
 * @extends {MutableEntity}
 * @classdesc Autonomy entity to move by AI
 */
class AutonomyEntity extends MutableEntity {
    /**
     * Add AI system
     * @param {AI} ai AI to control this
     * @param {number} priority Priority of AI
     */
    addAI(ai, priority) {
        ai.setEntity(this);
        ai.init();
    }

    /**
     * Remove AI system
     * @abstract
     * @param {AI} ai AI to control this
     */
    removeAI(ai) {}

    /**
     * Update entity's AI
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    updateAI(dt) {}

    /**
     * Apply entity's AI
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    applyAI(dt) {}

    /**
     * Update entty
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        super.update(dt);
        this.updateAI(dt);
        this.applyAI(dt);
    }
}
