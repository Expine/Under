import { Entity } from "./Entity";
import { GameImage } from "../../resources/image/GameImage";
import { Context } from "../../resources/image/Context";

/**
 * Imaged entity
 * - Manages image
 * @abstract
 * @extends {Entity}
 * @classdesc Imaged entity to manage image
 */
export abstract class ImagedEntity extends Entity {
    /**
     * Image ID
     * @protected
     * @type {GameImage?}
     */
    protected image: GameImage | null;

    /**
     * Imaged entity constructor
     */
    constructor() {
        super();
        this.image = null;
    }

    /**
     * Set image
     * @param {GameImage} image Image
     */
    setImage(image: GameImage) {
        this.image = image;
    }

    /**
     * Get image
     * @return {GameImage?} Image
     */
    getImage(): GameImage | null {
        return this.image;
    }

    /**
     * Set entity size
     * @override
     * @param {number} width Entity width
     * @param {number} height Entity height
     */
    setSize(width: number, height: number) {
        super.setSize(width, height);
        if (this.image !== null) {
            this.image.setSize(width, height);
        }
    }

    /**
     * Initialize entity
     * @override
     */
    init() {
        if (this.image !== null) {
            this.image.init();
        }
    }

    /**
     * Update entty
     * @override
     * @param {number} dt Delta time
     */
    update(dt: number) {
        if (this.image !== null) {
            this.image.update(dt);
        }
    }

    /**
     * Render entity
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx: Context, shiftX: number = 0, shiftY: number = 0) {
        if (this.image !== null) {
            this.image.render(ctx, this.x + shiftX, this.y + shiftY);
        }
    }
}
