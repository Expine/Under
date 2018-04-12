/**
 * State of normal grab action
 * @implements {UnderMovableState}
 * @classdesc State for normal grab action
 */
class NormalGrabState extends UnderMovableState { // eslint-disable-line  no-unused-vars
    /**
     * Normal Grab state constructor
     * @constructor
     * @param {number} maxVelocityX Maximum speed
     * @param {number} walkPower The power to walk
     */
    constructor(maxVelocityX, walkPower) {
        super();

        this.maxVelocityX = maxVelocityX;
        this.movePowerX = walkPower;

        /**
         * Count for action
         * @private
         * @type {number}
         */
        this.underCount_ = 0;

        /**
         * Amount of indicating difference of height
         * @protected
         * @type {number}
         */
        this.underDiffY = 12;
    }

    /**
     * Initialize state
     * @override
     */
    init() {
        this.stateAnimation.restore();
        this.underCount_ = 0;
        let aabb = this.entity.collider.getAABB();
        this.entity.collider.fixBoundDirectly(aabb.startX - this.entity.x, aabb.startY + this.underDiffY - this.entity.y, aabb.endX - this.entity.x, aabb.endY - this.entity.y);
    }

    /**
     * Set entity for targeting
     * @override
     * @param {AutonomyObject} entity Entity for tageting
     */
    setEntity(entity) {
        if (BaseUtil.implementsOf(entity, UnderPlayable)) {
            super.setEntity(entity);
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
     * @param {number} dt - delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        // judge
        if (!Util.onGround(this.entity) || !Input.it.isPressed(Input.key.down())) {
            if (++this.underCount_ > 5) {
                // restore
                let aabb = this.entity.collider.getAABB();
                this.entity.collider.fixBoundDirectly(aabb.startX - this.entity.x, aabb.startY - this.underDiffY - this.entity.y, aabb.endX - this.entity.x, aabb.endY - this.entity.y);
                // check collision
                let check = false;
                for (let it of this.entity.stage.getPhysicalWorld().getCollisionData(this.entity)) {
                    if (it.ny < -0.5) {
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
                    this.entity.collider.fixBoundDirectly(aabb.startX - this.entity.x, aabb.startY + this.underDiffY - this.entity.y, aabb.endX - this.entity.x, aabb.endY - this.entity.y);
                }
            }
        } else {
            this.underCount_ = 0;
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
                    this.entity.collider.fixBoundDirectly(aabb.startX - this.entity.x, aabb.startY - this.underDiffY - this.entity.y, aabb.endX - this.entity.x, aabb.endY - this.entity.y);
                    this.stateAnimation.init();
                }
            } else {
                this.stateAnimation.pause();
            }
        }
        if ((this.stateAnimation.isEnded() || this.stateAnimation.isLoop()) && Util.onGround(this.entity)) {
            // restore
            let aabb = this.entity.collider.getAABB();
            this.entity.collider.fixBoundDirectly(aabb.startX - this.entity.x, aabb.startY - this.underDiffY - this.entity.y, aabb.endX - this.entity.x, aabb.endY - this.entity.y);
            // change
            let ground = Util.getUnderEntity(this.entity);
            if (BaseUtil.implementsOf(ground, Terrainable)) {
                if (this.entity.changeType(ground.getTerrainID())) {
                    this.changed();
                    return true;
                }
            }
            aabb = this.entity.collider.getAABB();
            this.entity.collider.fixBoundDirectly(aabb.startX - this.entity.x, aabb.startY + this.underDiffY - this.entity.y, aabb.endX - this.entity.x, aabb.endY - this.entity.y);
        }
        return true;
    }
}
