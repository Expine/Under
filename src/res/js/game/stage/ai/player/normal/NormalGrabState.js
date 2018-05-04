/**
 * Normal grab state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - Basic information can be transferred to another state
 * - Render entity by entity own image ID for change type
 * - Sets max velocity and move power for moving
 * - Enable to set velocity and power
 * - ### Manages grabed behavior
 * @implements {UnderMovableState}
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
     * Initialize state
     * @override
     */
    init() {
        // set image
        let image = this.entity.getImage();
        if (image instanceof NamedAnimation) {
            image.setName(this.ai.getStateID());
        }
        if (image instanceof GameAnimation) {
            image.restore();
        }
        this.underCount = 0;
        this.grabCollider();
    }

    /**
     * Set entity for targeting
     * @override
     * @param {AutonomyEntitiy} entity Entity for tageting
     */
    setEntity(entity) {
        super.setEntity(entity);
        if (BaseUtil.implementsOf(entity, IUnderPlayable)) {
            this.player = entity;
        }
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
        let aabb = this.entity.collider.getAABB();
        this.entity.collider.fixBound(aabb.startX - this.entity.x, aabb.startY + this.underDiffY - this.entity.y, aabb.endX - this.entity.x, aabb.endY - this.entity.y);
    }

    /**
     * Restore collider information
     * @protected
     */
    restoreCollider() {
        let aabb = this.entity.collider.getAABB();
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
        let check = this.entity.stage.getPhysicalWorld().getCollisionData(this.entity.collider).some((it) => {
            return it.e2.collider.isResponse(this.entity) && it.ny < -0.5;
        });
        if (check) {
            return true;
        }

        // restore
        this.entity.image.init();
        this.restoreCollider();
        this.transitionUsualState();
        return false;
    }

    /**
     * Walk whle grab state
     * @protected
     * @param {number} dt Delta time
     */
    grabWalk(dt) {
        let moved = this.moveByInput(dt);
        if (moved) {
            if (this.entity.getImage() instanceof GameAnimation) {
                this.entity.getImage().restore();
            }
            // TODO: Is there a better way to do it?
            if (this.ai.getStateID() == `grab`) {
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
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        let image = this.entity.getImage();
        let canGrabAction = (!(image instanceof GameAnimation) || (image.isEnded() || image.isLoop()));
        // judge
        if (!Util.onGround(this.entity) || !Input.it.isPressed(Input.key.down())) {
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
            let ground = Util.getUnderEntity(this.entity);
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
