import { Stage } from "../Stage";
import { Context } from "../../resources/image/Context";

/**
 * Entity
 * - Object present on the stage that has coordinate and size
 * @abstract
 * @classdesc Entity that has coordinate and size
 */
export abstract class Entity {
    /**
     * Entity x position
     * @type {number}
     */
    x: number;
    /**
     * Entity Y position
     * @type {number}
     */
    y: number;
    /**
     * Entity Z position
     * @type {number}
     */
    z: number;
    /**
     * Entity width
     * @type {number}
     */
    width: number;
    /**
     * Entity height
     * @type {number}
     */
    height: number;

    /**
     * Stage instance
     * @type {Stage}
     */
    stage: Stage | null;

    /**
     * Entity constructor
     * @constructor
     */
    constructor() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.width = 0;
        this.height = 0;

        this.stage = null;
    }

    /**
     * Set stage
     * @param {Stage} stage  Stage instance
     */
    setStage(stage: Stage) {
        this.stage = stage;
    }

    /**
     * Set entity position
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} [z=z] Z position
     */
    setPosition(x: number, y: number, z: number = this.z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /**
     * Set entity size
     * @param {number} width Entity width
     * @param {number} height Entity height
     */
    setSize(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    /**
     * Initialize entity
     * @abstract
     */
    abstract init(): void;

    /**
     * Update entty
     * @abstract
     * @param {number} dt Delta time
     */
    abstract update(dt: number): void;

    /**
     * Render entity
     * @abstract
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    abstract render(ctx: Context, shiftX: number, shiftY: number): void;
}
