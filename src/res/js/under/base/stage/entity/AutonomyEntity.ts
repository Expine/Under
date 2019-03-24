import { MutableEntity } from "./MutableEntity";
import { AI } from "../ai/AI";

/**
 * Autonomy entity
 * - It can move by AI
 * @abstract
 * @extends {MutableEntity}
 * @classdesc Autonomy entity to move by AI
 */
export abstract class AutonomyEntity extends MutableEntity {
    /**
     * Add AI system
     * @param {AI} ai AI to control this
     * @param {number} priority Priority of AI
     */
    addAI(ai: AI, _priority: number | null) {
        ai.setEntity(this);
        ai.init();
    }

    /**
     * Remove AI system
     * @abstract
     * @param {AI} ai AI to control this
     */
    abstract removeAI(ai: AI): void;

    /**
     * Update entity's AI
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    abstract updateAI(dt: number): void;

    /**
     * Apply entity's AI
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    abstract applyAI(dt: number): void;

    /**
     * Update entty
     * @override
     * @param {number} dt Delta time
     */
    update(dt: number) {
        super.update(dt);
        this.updateAI(dt);
        this.applyAI(dt);
    }
}
