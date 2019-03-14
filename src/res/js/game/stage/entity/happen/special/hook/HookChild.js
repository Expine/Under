/**
 * Hook child object
 * - Object present on the stage that has coordinate and size
 * - Manages image
 * - It can be collided because it has material and collider
 * - It is not fixed and can be moved
 * - It can move by AI
 * - Manages AI by list
 * - Generated and owned by someone
 * - Object that can be destroyed
 * - It can get hook position and change state
 * - Implements hook and automatically generates post hook object
 * - ### Implements as rectangle
 * @extends {HookObject}
 * @classdesc Hook child object to implement as rectangle
 */
class HookChild extends HookObject {
    /**
     * Hook center x position
     * @override
     * @protected
     * @return {number} Hook center x position
     */
    getHookX() {
        return this.x + this.width / 2;
    }

    /**
     * Hook center x position
     * @override
     * @protected
     * @return {number} Hook center x position
     */
    getHookY() {
        return this.y + this.height / 2;
    }

    /**
     * Initialize entity
     * @override
     */
    init() {
        super.init();
        this.setPosition(this.x + this.x - this.getHookX(), this.y + this.y - this.getHookY());
    }
}
