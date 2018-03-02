/**
 * AutonomyObject object
 * It is not fixed and can be moved
 * It can move by AI
 * @implements {MutableObject}
 * @classdesc Autonomy object to move by AI
 */
class AutonomyObject extends MutableObject { // eslint-disable-line  no-unused-vars
    /**
     * Add AI system
     * @interface
     * @param {AI} ai AI to control this
     * @param {number} priority priority of AI
     */
    addAI(ai, priority) {}
}
