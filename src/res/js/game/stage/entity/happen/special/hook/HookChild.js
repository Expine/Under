/**
 * Hook child object
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
 * - ### Implements as rectangle
 * @implements {HookObject}
 * @classdesc Hook child object to implement as rectangle
 */
class HookChild extends HookObject { // eslint-disable-line  no-unused-vars
    /**
     * Initialize entity
     * @override
     */
    init() {
        super.init();
        // set base data
        let collider = new ExcludedRectangleCollider(0, 0, this.width, this.height, 0, 2);
        collider.setAABB(new SimpleAABB());
        this.setCollider(collider);
        this.setMaterial(new ImmutableMaterial(0.1, 0.0, 0.0));
        this.setRigidBody(new PreciseBody());
        this.body.setMaterial(new ImmutableRigidMaterial());
        this.addAI(new HookStateAI(this));

        this.x -= (this.getHookX() - this.x);
        this.y -= (this.getHookY() - this.y);
    }

    /**
     * Hook center x position
     * @override
     * @return {number} Hook center x position
     */
    getHookX() {
        return this.x + this.width / 2;
    }

    /**
     * Hook center x position
     * @override
     * @return {number} Hook center x position
     */
    getHookY() {
        return this.y + this.height / 2;
    }
}
