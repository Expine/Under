import { GameAnimation } from "../../../base/resources/image/GameAnimation";
import { GameImage } from "../../../base/resources/image/GameImage";

/**
 * Single animation
 * - Runs single animation
 * @extends {GameAnimation}
 * @classdesc Single animation to run single animation
 */
export class SingleAnimation extends GameAnimation {
    /**
     * List of animation element
     * @protected
     * @type {Array<GameImage>}
     */
    protected animation: Array<GameImage>
    /**
     * List of animation delta number
     * @protected
     * @type {Array<number>}
     */
    protected deltas: Array<number>

    /**
     * Animation counter
     * @protected
     * @type {number}
     */
    protected animationCount: number;

    /**
     * Running animation number
     * @protected
     * @type {number}
     */
    protected runningAnimation: number;

    /**
     * Whether to loop or not
     * @protected
     * @type {boolean}
     */
    protected loop: boolean;

    /**
     * Whether the animation has ended or not
     * @protected
     * @type {boolean}
     */
    protected ended: boolean;

    /**
     * Whether pause animation or not
     * @protected
     * @type {boolean}
     */
    protected paused: boolean;

    /**
     * Single animation constructor
     * @constructor
     * @param {boolean} [loop=true] Whether to loop or not
     */
    constructor(loop: boolean = true) {
        super();

        this.animation = [];
        this.deltas = [];
        this.animationCount = 0;
        this.runningAnimation = 0;
        this.loop = loop;
        this.ended = false;
        this.paused = false;
    }

    /**
     * Whether to loop or not
     * @override
     * @return {boolean} Whether to loop or not
     */
    isLoop(): boolean {
        return this.loop;
    }

    /**
     * Whether the animation has ended or not
     * @override
     * @return {boolean} Whether the animation has ended or not
     */
    isEnded(): boolean {
        return this.ended;
    }

    /**
     * Pause animation
     * @override
     */
    pause() {
        this.paused = true;
    }

    /**
     * Restore animation
     * @override
     */
    restore() {
        this.paused = false;
    }

    /**
     * Get animation count indicating animation progress
     * @return {number} Animation count
     */
    getAnimationCount(): number {
        return this.runningAnimation / this.animation.length;
    }

    /**
     * Add animation
     * @override
     * @param {GameImage} image Animation element
     * @param {number} delta Animation delta time
     */
    addAnimation(image: GameImage, delta: number) {
        this.animation.push(image);
        this.deltas.push(delta);
    }

    /**
     * Get list of animation elements
     * @override
     * @protected
     * @return {Array<GameImage>} List of animation elements
     */
    getImages(): Array<GameImage> {
        return this.animation;
    }

    /**
     * Get current image of animation
     * @abstract
     * @protected
     * @return {GameImage} Current image of animation
     */
    getCurrentImage(): GameImage | null {
        return this.animation[this.runningAnimation] === undefined ? null : this.animation[this.runningAnimation];
    }

    /**
     * Initialize animation
     * @override
     */
    init() {
        super.init();
        this.animationCount = 0;
        this.runningAnimation = 0;
        this.ended = false;
    }

    /**
     * Update animation
     * @override
     * @param {number} dt Delta time
     */
    update(dt: number) {
        // check
        if (this.paused || this.animation.length === 0) {
            return;
        }
        if (!this.isLoop() && this.isEnded()) {
            return;
        }
        // update image
        super.update(dt);
        // update animation
        let delta = this.deltas[this.runningAnimation];
        this.animationCount += dt;
        while (this.animationCount >= delta) {
            this.animationCount -= delta;
            if (++this.runningAnimation >= this.animation.length) {
                this.ended = true;
                if (this.isLoop()) {
                    this.runningAnimation = 0;
                } else {
                    this.runningAnimation--;
                }
            }
            delta = this.deltas[this.runningAnimation];
        }
    }
}
