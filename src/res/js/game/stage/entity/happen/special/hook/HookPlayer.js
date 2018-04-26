/**
 * Hook player object
 * - Object present on the stage that has coordinate and size
 * - Has image ID
 * - It can be collided because it has material and collider
 * - It is not fixed and can be moved
 * - It can move by AI
 * - Manages AI by list
 * - Generated and owned by someone
 * - Object that can be destroyed
 * - Enable to set animation
 * - Object caused by special actions
 * - It can get hook position and change state
 * - Implements hook and automatically generates post hook object
 * - ### Player's representation so it does not exists on stage
 * @implements {HookObject}
 * @classdesc Hook player object that player's representation so it does not exists on stage
 */
class HookPlayer extends HookObject { // eslint-disable-line  no-unused-vars
    /**
     * Initialize entity
     * @override
     */
    init() {
        super.init();
        this.string.addBody(this.owner.body, this.owner.width + this.generatedX, -this.generatedY, this.string.getLength());
    }

    /**
     * Hook center x position
     * @override
     * @return {number} Hook center x position
     */
    getHookX() {
        return this.owner.directionX >= 0 ? this.generatedX + this.owner.x + this.owner.width : this.owner.x - this.generatedX;
    }

    /**
     * Hook center x position
     * @override
     * @return {number} Hook center x position
     */
    getHookY() {
        return this.owner.y - this.generatedY;
    }

    /**
     * Hooked hook
     * @override
     */
    hooked() {}

    /**
     * Release hook
     * @override
     */
    release() {}

    /**
     * Destroy object
     * @override
     */
    destroy() {}
}
