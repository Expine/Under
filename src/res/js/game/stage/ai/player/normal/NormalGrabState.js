/**
 * Normal grab state
 * - Determines the operation by AI according to the state and renders based on state
 * - Enable to set animation
 * - Base state for rendering state animation
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
        this.stateAnimation.restore();
        this.underCount = 0;
        let aabb = this.entity.collider.getAABB();
        this.entity.collider.fixBound(aabb.startX - this.entity.x, aabb.startY + this.underDiffY - this.entity.y, aabb.endX - this.entity.x, aabb.endY - this.entity.y);
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
    changed() {}

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        // judge
        if (!Util.onGround(this.entity) || !Input.it.isPressed(Input.key.down())) {
            if (++this.underCount > 5) {
                // restore
                let aabb = this.entity.collider.getAABB();
                this.entity.collider.fixBound(aabb.startX - this.entity.x, aabb.startY - this.underDiffY - this.entity.y, aabb.endX - this.entity.x, aabb.endY - this.entity.y);
                // check collision
                let check = false;
                for (let it of this.entity.stage.getPhysicalWorld().getCollisionData(this.entity)) {
                    if (it.e2.collider.isResponse(this.entity) && it.ny < -0.5) {
                        check = true;
                    }
                }
                if (!check) {
                    if (this.entity.body.isFixX) {
                        this.ai.changeState(`stationary`);
                    } else {
                        this.ai.changeState(`walk`);
                    }
                    this.stateAnimation.init();
                    return;
                } else {
                    // restore
                    let aabb = this.entity.collider.getAABB();
                    this.entity.collider.fixBound(aabb.startX - this.entity.x, aabb.startY + this.underDiffY - this.entity.y, aabb.endX - this.entity.x, aabb.endY - this.entity.y);
                }
            }
        } else {
            this.underCount = 0;
        }
        if ((this.stateAnimation.isEnded() || this.stateAnimation.isLoop()) && Util.onGround(this.entity)) {
            // input
            let vx = 0;
            // walk
            if (Input.it.isPressed(Input.key.left())) {
                vx += -1;
            }
            if (Input.it.isPressed(Input.key.right())) {
                vx += 1;
            }
            if (vx != 0) {
                this.stateAnimation.restore();
                this.entity.directionX = vx;
                if (this.entity.body.velocityX * vx < 0 || Math.abs(this.entity.body.velocityX) < this.maxVelocityX) {
                    this.entity.body.enforce(vx * this.movePowerX * this.entity.material.mass / dt, 0);
                }
                if (this.ai.changeState(`grabwalk`)) {
                    // restore
                    let aabb = this.entity.collider.getAABB();
                    this.entity.collider.fixBound(aabb.startX - this.entity.x, aabb.startY - this.underDiffY - this.entity.y, aabb.endX - this.entity.x, aabb.endY - this.entity.y);
                    this.stateAnimation.init();
                }
            } else {
                this.stateAnimation.pause();
            }
        }
        if ((this.stateAnimation.isEnded() || this.stateAnimation.isLoop()) && Util.onGround(this.entity)) {
            // restore
            let aabb = this.entity.collider.getAABB();
            this.entity.collider.fixBound(aabb.startX - this.entity.x, aabb.startY - this.underDiffY - this.entity.y, aabb.endX - this.entity.x, aabb.endY - this.entity.y);
            // change
            let ground = Util.getUnderEntity(this.entity);
            if (BaseUtil.implementsOf(ground, ITerrain)) {
                if (this.player.changeType(ground.getTerrainID())) {
                    this.changed();
                    return true;
                }
            }
            aabb = this.entity.collider.getAABB();
            this.entity.collider.fixBound(aabb.startX - this.entity.x, aabb.startY + this.underDiffY - this.entity.y, aabb.endX - this.entity.x, aabb.endY - this.entity.y);
        }
        return true;
    }
}
