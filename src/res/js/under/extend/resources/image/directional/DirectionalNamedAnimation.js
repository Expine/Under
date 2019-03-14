/**
 * Directional named animation
 * - Renders image
 * - Manages animation
 * - Manages multiple animations
 * - Manages animation by name
 * - Considers the direction
 * - Clips area when rendering
 * - Delegates other animation
 * - ### Render animation considering the direction
 * @extends {DelegateNamedAnimation}
 * @implements {IDirectionalImage}
 * @classdesc Directional named animation to render animation considering the direction
 */
class DirectionalNamedAnimation extends DelegateNamedAnimation /* , IDirectionalImage */ {
    /**
     * Set direction of image
     * @override
     * @param {number} directionX Direction of x
     * @param {number} directionY Direction of y
     */
    setDirection(directionX, directionY) {
        for (const it of this.getAnimations()) {
            if (BaseUtil.implementsOf(it, IDirectionalImage)) {
                it.setDirection(directionX, directionY);
            }
        }
    }
}
