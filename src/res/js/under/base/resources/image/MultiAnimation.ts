import { GameAnimation } from "./GameAnimation";
import { GameImage } from "./GameImage";
import { Context } from "./Context";
import { ResourceID } from "../IResourceManager";

/**
 * Multi animation
 * - Manages multiple animations
 * @interface
 * @extends {GameAnimation}
 * @classdesc Multi animation to manage multiple animations
 */
export abstract class MultiAnimation extends GameAnimation {
    /**
     * Get animation from animations
     * @abstract
     * @return {GameAnimation} animation
     */
    abstract getAnimation(): GameAnimation | null;

    /**
     * Get list of animation
     * @abstract
     * @return {Array<GameAnimation>} List of animation
     */
    abstract getAnimations(): Array<GameAnimation>;

    /**
     * Set animation into animations
     * @abstract
     * @param {GameAnimation} animation Set animation
     */
    abstract setAnimation(animation: GameAnimation): void;

    /**
     * Set all animation size
     * @param {number} width Image width
     * @param {number} height Image height
     */
    setAllSize(width: number, height: number) {
        for (const it of this.getAnimations()) {
            it.setSize(width, height);
        }
    }

    /**
     * Set all animation size
     * @param {ResourceID} imageID Image ID
     */
    setAllImageID(imageID: ResourceID) {
        for (const it of this.getAnimations()) {
            it.setImageID(imageID);
        }
    }

    /**
     * Whether to loop or not
     * @override
     * @return {boolean} Whether to loop or not
     */
    isLoop(): boolean {
        const anime = this.getAnimation();
        return anime !== null && anime.isLoop();
    }

    /**
     * Whether the animation has ended or not
     * @override
     * @return {boolean} Whether the animation has ended or not
     */
    isEnded(): boolean {
        const anime = this.getAnimation();
        return anime !== null && anime.isEnded();
    }

    /**
     * Pause animation
     * @override
     */
    pause() {
        const anime = this.getAnimation();
        if (anime !== null) {
            anime.pause();
        }
    }

    /**
     * Restore animation
     * @override
     */
    restore() {
        const anime = this.getAnimation();
        if (anime !== null) {
            anime.restore();
        }
    }

    /**
     * Get animation count indicating animation progress
     * @override
     * @return {number} Animation count
     */
    getAnimationCount(): number {
        const anime = this.getAnimation();
        return anime !== null ? anime.getAnimationCount() : 0;
    }

    /**
     * Add animation
     * @override
     * @param {GameImage} image Animation element
     * @param {number} delta Animation delta time
     */
    addAnimation(image: GameImage, delta: number) {
        const anime = this.getAnimation();
        if (anime !== null) {
            anime.addAnimation(image, delta);
        }
    }

    /**
     * Get list of animation elements
     * @override
     * @protected
     * @return {Array<GameImage>} List of animation elements
     */
    getImages(): Array<GameImage> {
        const anime = this.getAnimation();
        return anime === null ? [] : anime.getImages();
    }

    /**
     * Get current image of animation
     * @override
     * @protected
     * @return {GameImage} Current image of animation
     */
    getCurrentImage(): GameImage | null {
        const anime = this.getAnimation();
        return anime === null ? null : anime.getCurrentImage();
    }

    /**
     * Initialize animation
     * @override
     */
    init() {
        const anime = this.getAnimation();
        if (anime !== null) {
            anime.init();
        }
    }

    /**
     * Update animation
     * @override
     * @param {number} dt
     */
    update(dt: number) {
        const anime = this.getAnimation();
        if (anime !== null) {
            anime.update(dt);
        }
    }

    /**
     * Render animation
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} x Image x position
     * @param {number} y Image y position
     */
    render(ctx: Context, x: number, y: number) {
        const anime = this.getAnimation();
        if (anime !== null) {
            anime.render(ctx, x, y);
        }
    }
}
