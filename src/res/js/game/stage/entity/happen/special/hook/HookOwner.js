/**
 * Hook player object
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
 * - ### Owner's representation so it does not exists on stage
 * @extends {HookObject}
 * @classdesc Hook player object that player's representation so it does not exists on stage
 */
class HookOwner extends HookObject { // eslint-disable-line  no-unused-vars
    /**
     * Hook center x position
     * @override
     * @return {number} Hook center x position
     */
    getHookX() {
        if (this.owner instanceof MutableEntity) {
            return this.owner.directionX >= 0 ? this.generatedX + this.owner.x + this.owner.width : this.owner.x - this.generatedX;
        } else {
            return this.x;
        }
    }

    /**
     * Hook center x position
     * @override
     * @return {number} Hook center x position
     */
    getHookY() {
        if (this.owner instanceof MutableEntity) {
            return this.owner.y - this.generatedY;
        } else {
            return this.y;
        }
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

    /**
     * Initialize entity
     * @override
     */
    init() {
        super.init();
        if (this.owner instanceof MutableEntity) {
            this.string.addBody(this.owner.body, this.owner.width + this.generatedX, -this.generatedY, this.string.getLength());
        }
    }
}
