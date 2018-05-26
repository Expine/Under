/**
 * Single animation
 * - Renders image
 * - Manages animation
 * - Runs single animation
 * - Considers the direction
 * - ### Render animation considering the direction
 * @extends {SingleAnimation}
 * @classdesc Single animation to render animation considering the direction
 */
class DirectionalSingleAnimation extends SingleAnimation /* , IDirectionalImage */ { // eslint-disable-line  no-unused-vars
    /**
     * Set direction of image
     * @override
     * @param {number} directionX Direction of x
     * @param {number} directionY Direction of y
     */
    setDirection(directionX, directionY) {
        for (const it of this.animation) {
            if (BaseUtil.implementsOf(it, IDirectionalImage)) {
                it.setDirection(directionX, directionY);
            }
        }
    }
}
