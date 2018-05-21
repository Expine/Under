/**
 * Hook head object
 * - Object present on the stage that has coordinate and size
 * - Has image ID
 * - It can be collided because it has material and collider
 * - It is not fixed and can be moved
 * - It can move by AI
 * - Manages AI by list
 * - Generated and owned by someone
 * - Object that can be destroyed
 * - It can get hook position and change state
 * - Implements hook and automatically generates post hook object
 * - ### Implements as head
 * @extends {HookObject}
 * @classdesc Hook head object to implement as head
 */
class HookHead extends HookObject { // eslint-disable-line  no-unused-vars
    /**
     * Hook head object constructor
     * @constructor
     * @param {number} restLength Hook rest length
     * @param {number} hookedLength Hook length of hooked
     * @param {number} childID Child id for generating child
     */
    constructor(restLength, hookedLength, childID) {
        super();

        /**
         * Hook head original body
         * @protected
         * @type {RigidBody}
         */
        this.originalBody = null;

        // initialize
        this.setHookInfo(null, null, restLength, hookedLength, childID);
    }

    /**
     * Hook center x position
     * @override
     * @protected
     * @return {number} Hook center x position
     */
    getHookX() {
        return this.x + Math.abs(this.width) / 2;
    }

    /**
     * Hook center x position
     * @override
     * @protected
     * @return {number} Hook center x position
     */
    getHookY() {
        return this.y + Math.abs(this.height) / 2;
    }

    /**
     * Hooked hook
     * @override
     */
    hooked() {
        super.hooked();
        this.originalBody.enable = false;
    }

    /**
     * Release hook
     * @override
     */
    release() {
        super.release();
        this.originalBody.enable = true;
    }

    /**
     * Whether the tip of the hook
     * @override
     * @return {boolean} Whether the tip of the hook
     */
    isHead() {
        return true;
    }

    /**
     * Initialize entity
     * @override
     */
    init() {
        super.init();

        if (BaseUtil.implementsOf(this.body, IString)) {
            this.string = this.body;
            let bodies = this.string.getBodies().filter((it) => it.getEntity() === this);
            this.originalBody = bodies.length === 0 ? null : bodies[0];
        }

        this.addAI(new HeadHookStateAI(this));

        this.directionX = this.owner.directionX;
        this.directionY = -1;
        this.setPosition(this.x + this.x - this.getHookX(), this.y + this.y - this.getHookY());
    }

    /**
     * Update entty
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        super.update(dt);
        // TODO: Maybe include image
        this.image.setSize(this.width * this.directionX, -this.height * (this.directionY === 0 ? 1 : this.directionY));
    }
}
