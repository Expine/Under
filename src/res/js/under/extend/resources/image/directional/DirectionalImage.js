/**
 * Directional image
 * - Renders image
 * - Considers the direction
 * - Clips area when rendering
 * - Delegates other image
 * - ### Renders considering the direction
 * @extends {DelegateImage}
 * @implements {IDirectionalImage}
 * @classdesc Directional image to render considering the direction
 */
class DirectionalImage extends DelegateImage /* , IDirectionalImage */ { // eslint-disable-line  no-unused-vars
    /**
     * Directional image constructor
     * @constructor
     * @param {GameImage} baseImage Base image for delegation
     */
    constructor(baseImage) {
        super(baseImage);

        /**
         * Image direction of X
         * @protected
         * @type {number}
         */
        this.directionX = 0;
        /**
         * Image direction of y
         * @protected
         * @type {number}
         */
        this.directionY = 0;
    }

    /**
     * Set direction of image
     * @override
     * @param {number} directionX Direction of x
     * @param {number} directionY Direction of y
     */
    setDirection(directionX, directionY) {
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
    render(ctx, x, y) {
        this.setSize(this.getWidth() * (this.directionX === 0 ? 1 : this.directionX), this.getHeight() * (this.directionY === 0 ? 1 : this.directionY * -1));
        super.render(ctx, x, y);
        this.setSize(this.getWidth() * (this.directionX === 0 ? 1 : this.directionX), this.getHeight() * (this.directionY === 0 ? 1 : this.directionY * -1));
    }
}
