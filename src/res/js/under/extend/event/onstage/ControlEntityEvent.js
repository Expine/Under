/**
 * Control entity event
 * - Updates and renders event
 * - Controls the stage
 * - Stores stage instance
 * - ### Controls entity
 * @extends {StageEvent}
 * @classdesc Control entity event to control entity
 */
class ControlEntityEvent extends StageEvent { // eslint-disable-line  no-unused-vars
    /**
     * Control entity event constructor
     * @constructor
     * @param {string} name Target entity name
     */
    constructor(name) {
        super();

        /**
         * Target entity name
         * @protected
         * @type {string}
         */
        this.targetName = name;

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
        let target = null;
        // TODO: Improve search method
        if (this.targetName == `player`) {
            target = this.stage.getEntities().find((it) => {
                return BaseUtil.implementsOf(it, IPlayable);
            });
        }
        if (target != null) {
            if (target instanceof MutableEntity) {
                target.body.setNextAddVelocity(this.vx - target.body.velocityX, this.vy - target.body.velocityY);
                target.body.enforce(this.fx, this.fy);
            }
        }
        this.op.next();
    }
}
