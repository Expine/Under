import { AutonomyEntity } from "../../entity/AutonomyEntity";
import { StateAI } from "../StateAI";
import { Context } from "../../../resources/image/Context";

/**
 * State
 * - Determines the operation by AI according to the state and renders based on state
 * @abstract
 * @classdesc State to determine the operation and render by state
 */
export abstract class State {
    /**
     * Entity for targeting
     * @type {AutonomyEntity}
     */
    entity: AutonomyEntity | null;

    /**
     * AI for operating
     * @type {StateAI}
     */
    ai: StateAI | null;

    /**
     * Whether it can render or not
     * @type {boolean}
     */
    canRendering: boolean;

    /**
     * State constructor
     * @constructor
     */
    constructor() {
        this.entity = null;
        this.ai = null;
        this.canRendering = false;
    }

    /**
     * Set entity for targeting
     * @param {AutonomyEntity} entity Entity for tageting
     */
    setEntity(entity: AutonomyEntity) {
        this.entity = entity;
    }

    /**
     * Set AI for operating
     * @param {StateAI} ai AI for operating
     */
    setAI(ai: StateAI) {
        this.ai = ai;
    }

    /**
     * Initialize
     * @abstract
     */
    abstract init(): void;

    /**
     * Update state
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
    abstract apply(dt: number): boolean

    /**
     * Render entity by this state
     * @abstract
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    abstract render(ctx: Context, shiftX: number, shiftY: number): void;
}
