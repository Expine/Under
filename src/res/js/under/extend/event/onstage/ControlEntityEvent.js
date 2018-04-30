/**
 * Control entity event
 * - Updates and renders event
 * - Controls the stage
 * - Stores stage instance
 * - ### Controls entity
 * @classdesc Control entity event to control entity
 */
class ControlEntityEvent extends StageEvent { // eslint-disable-line  no-unused-vars
    /**
     * Control entity event constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Target entity
         * @protected
         * @type {Entity}
         */
        this.target = null;
        /**
         * Target entity name
         * @protected
         * @type {string}
         */
        this.targetName = ``;

        /**
         * Next velocity of x direction
         * @protected
         * @type {number}
         */
        this.vx = 0;
        /**
         * Next velocity of y direction
         * @protected
         * @type {number}
         */
        this.vy = 0;
        /**
         * Next force of x direction
         * @protected
         * @type {number}
         */
        this.fx = 0;
        /**
         * Next force of y direction
         * @protected
         * @type {number}
         */
        this.fy = 0;
    }

    /**
     * Set target entity
     * @param {string} name Target entity name
     */
    setTarget(name) {
        this.targetName = name;
    }

    /**
     * Set next velocity
     * @param {number} vx Next velocity of x direction
     * @param {number} vy Next velocity of y direction
     */
    setVelocity(vx, vy) {
        this.vx = vx;
        this.vy = vy;
    }

    /**
     * Set force
     * @param {number} fx Next force of x direction
     * @param {number} fy Next force of y direction
     */
    setForce(fx, fy) {
        this.fx = fx;
        this.fy = fy;
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        super.init();
        // TODO: Improve search method
        if (this.targetName == `player`) {
            this.target = this.stage.getEntities().find((it) => {
                return BaseUtil.implementsOf(it, IPlayable);
            });
        }
        if (this.target != null) {
            if (this.target instanceof MutableEntity) {
                this.target.body.setNextAddVelocity(this.vx - this.target.body.velocityX, this.vy - this.target.body.velocityY);
                this.target.body.enforce(this.fx, this.fy);
            }
        }
        this.op.stopUpdate(this);
        this.op.stopRender(this);
        this.op.next();
    }
}
