/**
 * Immutable event object
 * - Object present on the stage that has coordinate and size
 * - Manages image
 * - Object that has collide
 * - ### Show sign
 * @extends {ImagedEntity}
 * @implements {IColliderable}
 * @classdesc Immutable event object to show sign
 */
class DoorObject extends ImagedEntity /* , IColliderable */ {
    /**
     * Influential event object constructor
     * @constructor
     * @param {string} [transition=null] Transition stage name
     * @param {boolean} [isReplace=false] Whether stage is replaced or not
     * @param {number} [popNumber=0] Number of applying pop
     */
    constructor(transition = null, isReplace = false, popNumber = 0) {
        super();

        /**
         * Transition stage name
         * @protected
         * @type {string}
         */
        this.transition = transition;
        /**
         * Whether stage is replaced or not
         * @protected
         * @type {boolean}
         */
        this.isReplace = isReplace;
        /**
         * Number of applying pop
         * @protected
         * @type {number}
         */
        this.popNumber = popNumber;

        /**
         * Door collider for
         * @protected
         * @type {Collider}
         */
        this.doorCollider = null;

        /**
         * Whether transition is executing now or not
         * @protected
         * @type {boolean}
         */
        this.isTransitioning = false;
    }

    /**
     * Set collider
     * @param {Collider} collider collider
     */
    setCollider(collider) {
        this.doorCollider = collider;
        this.doorCollider.setEntity(this);
        this.doorCollider.init();
    }

    /**
     * Get collider
     * @override
     * @return {Collider} Collider that object has
     */
    getCollider() {
        return this.doorCollider;
    }

    /**
     * Initialize entity
     * @override
     */
    init() {
        this.doorCollider.update();
    }

    /**
     * Update entty
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        // opening
        if (this.isTransitioning) {
            super.update(dt);
            if (Util.canEnd(this.image)) {
                // transition
                Input.key.setInputEnable(true);
                for (let i = 0; i < this.popNumber; ++i) {
                    StageManager.it.popStage();
                }
                if (this.transition !== null) {
                    if (this.isReplace) {
                        StageManager.it.replaceStage(this.transition);
                    } else {
                        StageManager.it.pushStage(this.transition);
                    }
                }
                this.isTransitioning = false;
            }
            return;
        }
        // open
        if (Input.key.isPress(Input.key.up())) {
            for (const it of this.stage.getPhysicalWorld().getCollisionData(this.doorCollider)) {
                const you = Util.getCollidedEntity(this, it);
                if (BaseUtil.implementsOf(you, IPlayable) && Util.onGround(you)) {
                    this.isTransitioning = true;
                    Input.key.setInputEnable(false);
                }
            }
        }
    }
}
