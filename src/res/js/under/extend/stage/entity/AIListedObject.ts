import { AutonomyEntity } from "../../../base/stage/entity/AutonomyEntity";
import { AI } from "../../../base/stage/ai/AI";

/**
 * AI listed object
 * - Manages AI by list
 * @extends {AutonomyEntity}
 * @classdesc AI listed object to manage AI by list
 */
export class AIListedObject extends AutonomyEntity {
    /**
     * AI list to control this
     * @protected
     * @type {Array<AI>}
     */
    protected ai: Array<AI>;


    /**
     * AI listed object constructor
     * @constructor
     */
    constructor() {
        super();

        this.ai = [];
    }

    /**
     * Add AI system
     * @override
     * @param {AI} ai AI to control this
     * @param {number} [priority=-1] Priority of AI. If it is a positive number count from the front, if it is a negative number count from the back
     */
    addAI(ai: AI, priority: number | null) {
        if (priority === null) {
            priority = -1;
        }
        const index = priority < 0 ? this.ai.length + priority + 1 : priority;
        this.ai.splice(index, 0, ai);
        // initialize
        super.addAI(ai, priority);
    }

    /**
     * Remove AI system
     * @override
     * @param {AI} ai AI to control this
     */
    removeAI(ai: AI) {
        const index = this.ai.indexOf(ai);
        if (index !== -1) {
            this.ai.splice(index, 1);
        }
    }

    /**
     * Update entity's AI
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateAI(dt: number) {
        for (const it of this.ai) {
            it.update(dt);
        }
    }

    /**
     * Apply entity's AI
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    applyAI(dt: number) {
        for (const it of this.ai) {
            if (it.apply(dt)) {
                break;
            }
        }
    }
}
