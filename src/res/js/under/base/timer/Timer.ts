import { Context } from "../resources/image/Context";

/**
 * Timer
 * - Measure the time
 * @abstract
 * @classdesc TImer to measure the time
 */
export abstract class Timer {
    /**
     * Instance for singleton
     * @type {Timer}
     */
    static it: Timer;

    /**
     * Delta time
     * @protected
     * @type {number}
     */
    protected deltaTime: number;

    /**
     * Timer constructor
     * @constructor
     */
    constructor() {
        this.deltaTime = 0;

        // set singleton
        Timer.it = this;
    }

    /**
     * Get deltatime
     * @return {number} Deltatime
     */
    getDeltatime(): number {
        return this.deltaTime;
    }

    /**
     * Start to measure timer by name
     * @abstract
     * @param {string} name Timer name
     */
    abstract startTimer(name: string): void;

    /**
     * Stop measuring timer by name
     * @abstract
     * @param {string} name Timer name
     */
    abstract stopTimer(name: string): void;

    /**
     * Get timer by name
     * @abstract
     * @param {string} name Timer name
     * @return {number} Timer by name
     */
    abstract getTimer(name: string): number;

    /**
     * Initialize timer
     * @abstract
     */
    abstract init(): void;

    /**
     * Update timer
     * @param {number} dt Delta time
     */
    update(dt: number) {
        this.deltaTime = dt;
    }

    /**
     * Render timer
     * @abstract
     * @param {Context} ctx Canvas context
     * @param {number} x Timer x position
     * @param {number} y Timer y position
     */
    abstract render(ctx: Context, x: number, y: number): void;
}
