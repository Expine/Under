/**
 * Multi named Animation
 * - Renders image
 * - Manages animation
 * - Manages multiple animations
 * - Manages animation by name
 * - Sets and gets by currently name
 * - Considers the direction
 * - ### Render animation considering the direction
 * @extends {MultiNamedAnimation}
 * @classdesc Multi named animation to render animation considering the direction
 */
class DirectionalMultiNamedAnimation extends MultiNamedAnimation { // eslint-disable-line  no-unused-vars
    /**
     * Set direction of image
     * @override
     * @param {number} directionX Direction of x
     * @param {number} directionY Direction of y
     */
    setDirection(directionX, directionY) {
        for (const it in this.animation) {
            if (this.animation.hasOwnProperty(it) && BaseUtil.implementsOf(this.animation[it], IDirectionalImage)) {
                this.animation[it].setDirection(directionX, directionY);
            }
        }
    }
}
