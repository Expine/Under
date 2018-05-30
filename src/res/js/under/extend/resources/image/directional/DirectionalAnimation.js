/**
 * Directional animation
 * - Renders image
 * - Manages animation
 * - Considers the direction
 * - Clips area when rendering
 * - Delegates other animation
 * - ### Render animation considering the direction
 * @extends {DelegateAnimation}
 * @implements {IDirectionalImage}
 * @classdesc Directional animation to render animation considering the direction
 */
class DirectionalAnimation extends DelegateAnimation /* , IDirectionalImage */ { // eslint-disable-line  no-unused-vars
    /**
     * Set direction of image
     * @override
     * @param {number} directionX Direction of x
     * @param {number} directionY Direction of y
     */
    setDirection(directionX, directionY) {
        for (const it of this.getImages()) {
            if (BaseUtil.implementsOf(it, IDirectionalImage)) {
                it.setDirection(directionX, directionY);
            }
        }
    }
}
