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
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        // judge
        if (!Util.onGround(this.entity) || !Input.it.isKeyPressed(Input.it.down)) {
            if (++this.underCount_ > 5) {
                // restore
                let aabb = this.entity.collider.getAABB();
                this.entity.collider.fixBoundDirectly(aabb.startX - this.entity.x, aabb.startY - this.underDiffY - this.entity.y, aabb.endX - this.entity.x, aabb.endY - this.entity.y);
                if (this.entity.body.isFix) {
                    this.ai.changeState(`stationary`);
                } else {
                    this.ai.changeState(`walk`);
                }
                this.stateAnimation.init();
                return;
            }
        } else {
            this.underCount_ = 0;
        }
        if ((this.stateAnimation.isEnded() || this.stateAnimation.isLoop()) && Util.onGround(this.entity) && Input.it.isKeyPressed(Input.it.down)) {
            // input
            let vx = 0;
            // walk
            if (Input.it.isKeyPressed(Input.it.left)) {
                vx += -1;
            }
            if (Input.it.isKeyPressed(Input.it.right)) {
                vx += 1;
            }
            if (vx != 0) {
                this.entity.directionX = vx;
                if (this.entity.body.preVelocityX * vx < 0 || Math.abs(this.entity.body.preVelocityX) < this.maxVelocityX) {
                    this.entity.body.enforce(vx * this.movePowerX * this.entity.material.mass / dt, 0);
                }
                if (this.ai.changeState(`grabwalk`)) {
                    // restore
                    let aabb = this.entity.collider.getAABB();
                    this.entity.collider.fixBoundDirectly(aabb.startX - this.entity.x, aabb.startY - this.underDiffY - this.entity.y, aabb.endX - this.entity.x, aabb.endY - this.entity.y);
                    this.stateAnimation.init();
                }
            }
            // restore
            let aabb = this.entity.collider.getAABB();
            this.entity.collider.fixBoundDirectly(aabb.startX - this.entity.x, aabb.startY - this.underDiffY - this.entity.y, aabb.endX - this.entity.x, aabb.endY - this.entity.y);
            // change
            let ground = Util.getUnderEntity(this.entity);
            if (BaseUtil.implementsOf(ground, Terrainable)) {
                if (!this.entity.changeType(ground.getTerrainID())) {
                    aabb = this.entity.collider.getAABB();
                    this.entity.collider.fixBoundDirectly(aabb.startX - this.entity.x, aabb.startY + this.underDiffY - this.entity.y, aabb.endX - this.entity.x, aabb.endY - this.entity.y);
                }
            }
        }
        return true;
    }
}
