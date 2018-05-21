/**
 * Normal grab state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - Basic information can be transferred to another state
 * - Render entity by entity own image ID for change type
 * - Sets max velocity and move power for moving
 * - Enable to set velocity and power
 * - ### Manages grabed behavior
 * @extends {UnderMovableState}
 * @classdesc Normal grab state to manage grabed behavior
 */
class NormalGrabState extends UnderMovableState { // eslint-disable-line  no-unused-vars
    /**
     * Normal grab state constructor
     * @constructor
     * @param {number} maxVelocityX Maximum speed
     * @param {number} walkPower The power to walk
     */
    constructor(maxVelocityX, walkPower) {
        super(maxVelocityX, 0, walkPower, 0);

        /**
         * Count for action
         * @protected
         * @type {number}
         */
        this.underCount = 0;

        /**
         * Amount of indicating difference of height
         * @protected
         * @type {number}
         */
        this.underDiffY = 12;

        /**
         * Player at registered entity
         * @protected
         * @type {IUnderPlayable}
         */
        this.player = null;
    }

    /**
     * Type changed function
     * @protected
     */
    changed() {
        this.restoreCollider();
    }

    /**
     * Change collider for grab action
     * @protected
     */
    grabCollider() {
        const aabb = this.entity.collider.getAABB();
        this.entity.collider.fixBound(aabb.startX - this.entity.x, aabb.startY + this.underDiffY - this.entity.y, aabb.endX - this.entity.x, aabb.endY - this.entity.y);
    }

    /**
     * Restore collider information
     * @protected
     */
    restoreCollider() {
        const aabb = this.entity.collider.getAABB();
        this.entity.collider.fixBound(aabb.startX - this.entity.x, aabb.startY - this.underDiffY - this.entity.y, aabb.endX - this.entity.x, aabb.endY - this.entity.y);
    }

    /**
     * Judged whether or not the state continues
     * @protected
     * @return {boolean} Whether or not the state continues
     */
    judgeContinue() {
        if (++this.underCount <= 5) {
            return true;
        }

        // check collision
        this.restoreCollider();
        const check = this.entity.stage.getPhysicalWorld().getCollisionData(this.entity.collider).some((it) => it.collided.collider.isResponse(this.entity) && it.ny < -0.5);
        if (check) {
            this.grabCollider();
            return true;
        }

        // restore
        this.entity.image.init();
        this.transitionUsualState();
        return false;
    }

    /**
     * Walk whle grab state
     * @protected
     * @param {number} dt Delta time
     */
    grabWalk(dt) {
        const moved = this.moveByInput(dt);
        if (moved) {
            if (this.entity.getImage() instanceof GameAnimation) {
                this.entity.getImage().restore();
            }
            if (this.ai.getStateID() === `grab`) {
                this.entity.image.init();
            }
            if (this.ai.changeState(`grabwalk`)) {
                // restore
                this.restoreCollider();
            }
        } else {
            if (this.entity.getImage() instanceof GameAnimation) {
                this.entity.getImage().pause();
            }
        }
    }

    /**
     * Initialize state
     * @override
     */
    init() {
        // set image
        const image = this.entity.getImage();
        if (image instanceof NamedAnimation) {
            image.setName(this.ai.getStateID());
        }
        if (image instanceof GameAnimation) {
            image.restore();
        }
        this.underCount = 0;
        this.grabCollider();

        if (BaseUtil.implementsOf(this.entity, IUnderPlayable)) {
            this.player = this.entity;
        }
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        const image = this.entity.getImage();
        const canGrabAction = (!(image instanceof GameAnimation) || (image.isEnded() || image.isLoop()));
        // judge
        if (!Util.onGround(this.entity) || !Input.key.isPressed(Input.key.down())) {
            if (!this.judgeContinue()) {
                return true;
            }
        } else {
            this.underCount = 0;
        }
        // move
        if (canGrabAction && Util.onGround(this.entity)) {
            this.grabWalk(dt);
        }
        // grab action
        if (canGrabAction && Util.onGround(this.entity)) {
            // change
            const ground = Util.getUnderEntity(this.entity);
            if (BaseUtil.implementsOf(ground, ITerrain)) {
                if (this.player.changeType(ground.getTerrainID())) {
                    this.changed();
                    return true;
                }
            }
        }
        return true;
    }
}
