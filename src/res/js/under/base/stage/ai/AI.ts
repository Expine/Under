import { AutonomyEntity } from "../entity/AutonomyEntity";

/**
 * AI
 * - Determines the behavior of an entity
 * @abstract
 * @classdesc AI for determining the behavior of an entity
 */
export abstract class AI {
    /**
     * Entity to which AI is attached
     * @type {AutonomyEntity}
     */
    protected entity: AutonomyEntity | null;

    /**
     * AI constructor
     * @constructor
     */
    constructor() {
        this.entity = null;
    }

    /**
     * Set autonomy entity
     * @param {AutonomyEntity} entity Autonomy entity
     */
    setEntity(entity: AutonomyEntity) {
        this.entity = entity;
    }

    /**
     * Initialize AI
     * @abstract
     */
    abstract init(): void;

    /**
     * Update AI
     * @abstract
     * @param {number} dt Delta time
     */
    abstract update(dt: number): void;

    /**
     * Apply AI and decide action
     * @abstract
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    abstract apply(dt: number): boolean;
}
