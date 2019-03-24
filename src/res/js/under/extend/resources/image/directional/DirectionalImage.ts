import { DelegateImage } from "../delegate/DelegateImage";
import { IDirectionalImage } from "../../../../base/resources/image/IDirectionalImage";
import { GameImage } from "../../../../base/resources/image/GameImage";
import { Context } from "../../../../base/resources/image/Context";

/**
 * Directional image
 * - Renders considering the direction
 * @extends {DelegateImage}
 * @implements {IDirectionalImage}
 * @classdesc Directional image to render considering the direction
 */
export class DirectionalImage extends DelegateImage implements IDirectionalImage {
    /**
     * Image direction of X
     * @protected
     * @type {number}
     */
    protected directionX: number;
    /**
     * Image direction of y
     * @protected
     * @type {number}
     */
    protected directionY: number;

    /**
     * Directional image constructor
     * @constructor
     * @param {GameImage} baseImage Base image for delegation
     */
    constructor(baseImage: GameImage) {
        super(baseImage);

        this.directionX = 0;
        this.directionY = 0;
    }

    /**
     * Set direction of image
     * @override
     * @param {number} directionX Direction of x
     * @param {number} directionY Direction of y
     */
    setDirection(directionX: number, directionY: number) {
        this.directionX = directionX;
        this.directionY = directionY;
    }

    /**
     * Render image
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} x Image x position
     * @param {number} y Image y position
     */
    render(ctx: Context, x: number, y: number) {
        this.setSize(this.getWidth() * (this.directionX === 0 ? 1 : this.directionX), this.getHeight() * (this.directionY === 0 ? 1 : this.directionY * -1));
        super.render(ctx, x, y);
        this.setSize(this.getWidth() * (this.directionX === 0 ? 1 : this.directionX), this.getHeight() * (this.directionY === 0 ? 1 : this.directionY * -1));
    }
}
