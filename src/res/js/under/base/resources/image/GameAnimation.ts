import { GameImage } from "./GameImage";
import { ResourceID } from "../IResourceManager";
import { Context } from "./Context";

/**
 * Game animation
 * - Manages animation
 * @abstract
 * @extends {GameImage}
 * @classdesc Game animation to manage animation
 */
export abstract class GameAnimation extends GameImage {
    /**
     * Whether to loop or not
     * @abstract
     * @return {boolean} Whether to loop or not
     */
    abstract isLoop(): boolean;

    /**
     * Whether the animation has ended or not
     * @abstract
     * @return {boolean} Whether the animation has ended or not
     */
    abstract isEnded(): boolean;

    /**
     * Pause animation
     * @abstract
     */
    abstract pause(): void;

    /**
     * Restore animation
     * @abstract
     */
    abstract restore(): void;

    /**
     * Get animation count indicating animation progress
     * @abstract
     * @return {number} Animation count
     */
    abstract getAnimationCount(): number;

    /**
     * Add animation
     * @abstract
     * @param {GameImage} image Animation element
     * @param {number} delta Animation delta time
     */
    abstract addAnimation(image: GameImage, delta: number): void;

    /**
     * Get list of animation elements
     * @abstract
     * @return {Array<GameImage>} List of animation elements
     */
    abstract getImages(): Array<GameImage>;

    /**
     * Get current image of animation
     * @abstract
     * @return {GameImage} Current image of animation
     */
    abstract getCurrentImage(): GameImage | null;

    /**
     * Set image size
     * @override
     * @param {number} width Image width
     * @param {number} height Image height
     */
    setSize(width: number, height: number) {
        for (const it of this.getImages()) {
            it.setSize(width, height);
        }
    }

    /**
     * Set image ID
     * @override
     * @param {ResourceID} imageID Image ID
     */
    setImageID(imageID: ResourceID) {
        for (const it of this.getImages()) {
            it.setImageID(imageID);
        }
    }

    /**
     * Get image ID
     * @abstract
     * @return {ResourceID} Image ID
     */
    getImageID(): ResourceID {
        const image = this.getCurrentImage();
        return image === null ? 0 : image.getImageID();
    }

    /**
     * Get image width
     * @override
     * @return {number} Imag width
     */
    getWidth(): number {
        const image = this.getCurrentImage();
        return image === null ? 0 : image.getWidth();
    }

    /**
     * Get image height
     * @override
     * @return {number} Imag height
     */
    getHeight(): number {
        const image = this.getCurrentImage();
        return image === null ? 0 : image.getHeight();
    }

    /**
     * Get source offset x position
     * @override
     * @return {number}
     */
    getSourceOffsetX(): number {
        const image = this.getCurrentImage();
        return image === null ? 0 : image.getSourceOffsetX();
    }

    /**
     * Get source offset y position
     * @override
     * @return {number}
     */
    getSourceOffsetY(): number {
        const image = this.getCurrentImage();
        return image === null ? 0 : image.getSourceOffsetY();
    }

    /**
     * Get source width
     * @override
     * @return {number}
     */
    getSourceWidth(): number {
        const image = this.getCurrentImage();
        return image === null ? 0 : image.getSourceWidth();
    }

    /**
     * Get source height
     * @override
     * @return {number}
     */
    getSourceHeight(): number {
        const image = this.getCurrentImage();
        return image === null ? 0 : image.getSourceHeight();
    }

    /**
     * Initialize image
     * @override
     */
    init() {
        for (const it of this.getImages()) {
            it.init();
        }
    }

    /**
     * Update image
     * @override
     * @param {number} dt
     */
    update(dt: number) {
        const image = this.getCurrentImage();
        if (image !== null) {
            image.update(dt);
        }
    }

    /**
     * Render image
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} x Image x position
     * @param {number} y Image y position
     */
    render(ctx: Context, x: number, y: number) {
        const image = this.getCurrentImage();
        if (image !== null) {
            image.render(ctx, x, y);
        }
    }
}
