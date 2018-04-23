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
 * - Enable to set animation
 * - Object caused by special actions
 * - It can get hook position and change state
 * - Implements hook and automatically generates post hook object
 * - ### Implements as head
 * @implements {HookObject}
 * @classdesc Hook head object to implement as head
 */
class HookHead extends HookObject { // eslint-disable-line  no-unused-vars
    /**
     * Hook head object constructor
     * @constructor
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} width Entity width
     * @param {number} height Entity height
     * @param {MutableEntity} owner Owned entity
     * @param {number} length Hook length
     * @param {number} restLength Hook rest length
     * @param {number} hookedLength Hook length of hooked
     */
    constructor(x, y, width, height, owner, length, restLength, hookedLength) {
        super(x, y, width, height, owner, null, null, restLength, hookedLength);

        /**
         * Original width for calculating hook x position
         * @protected
         * @type {number}
         */
        this.originalWidth = width;
        /**
         * Original height for calculating hook x position
         * @protected
         * @type {number}
         */
        this.originalHeight = height;

        // set base data
        let imageID = ResourceManager.image.load(`chara/hook.png`);
        let anime = new SingleAnimation();
        anime.addAnimation(new AnimationElement(imageID, 0, 0, 32, 32, 100));
        anime.addAnimation(new AnimationElement(imageID, 32, 0, 32, 32, 100));
        anime.addAnimation(new AnimationElement(imageID, 64, 0, 32, 32, 100));
        anime.addAnimation(new AnimationElement(imageID, 96, 0, 32, 32, 100));
        this.setAnimation(anime);
        let collider = new ExcludedRoundRectangleCollider((22 - 0) * this.width / 32, 0, 10 * this.width / 32, 10 * this.height / 32, 2, 0);
        collider.setAABB(new DirectionalAABB());
        this.setCollider(collider);
        this.setMaterial(new ImmutableMaterial(1, 0.0, 0.0));
        let org = new PreciseBody();
        org.setMaterial(new ImmutableRigidMaterial());
        let body = new StringBody(org, (this.directionX >= 0 ? this.getHookX() - this.x : this.x + this.width - this.getHookX()), (this.directionY > 0 ? this.getHookY() - this.y : this.y + this.height - this.getHookY()), length);
        body.setMaterial(new ImmutableRigidMaterial());
        this.setRigidBody(body);
        this.addAI(new HeadHookStateAI(this, body, org));

        this.string = body;
        this.directionX = owner.directionX;
        this.directionY = -1;
        this.x -= (this.getHookX() - this.x);
        this.y -= (this.getHookY() - this.y);
    }

    /**
     * Hook center x position
     * @override
     * @return {number} Hook center x position
     */
    getHookX() {
        return this.x + this.originalWidth / 2;
    }

    /**
     * Hook center x position
     * @override
     * @return {number} Hook center x position
     */
    getHookY() {
        return this.y + this.originalHeight / 2;
    }

    /**
     * Try to remove it
     * @override
     * @return {boolean} Whether it was removed
     */
    tryRemove() {
        if (super.tryRemove()) {
            this.owner.body.enable = true;
        }
        return false;
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
     * Render entity
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        this.width *= (this.directionX == 0 ? 1 : this.directionX);
        this.height *= -(this.directionY == 0 ? 1 : this.directionY);
        super.render(ctx, shiftX, shiftY);
        this.width = this.originalWidth;
        this.height = this.originalHeight;
    }
}
