/**
 * Attack object AI
 * - Determines the behavior of an entity
 * - ### AI that is attached to attack object
 * @extends {AI}
 * @classdesc Attack object AI that is attached to attack object
 */
class AttackObjectAI extends AI { // eslint-disable-line  no-unused-vars
    /**
     * Attack object AI Constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Owned entity
         * @protected
         * @type {Entity}
         */
        this.actor = null;

        /**
         * Previous actor x position
         * @protected
         * @type {number}
         */
        this.preActorX = 0;
        /**
         * Previous actor y position
         * @protected
         * @type {number}
         */
        this.preActorY = 0;
    }

    /**
     * Initialize
     * @override
     */
    init() {
        if (BaseUtil.implementsOf(this.entity, IOwned)) {
            this.actor = this.entity.getOwner();
            this.preActorX = this.actor.x;
            this.preActorY = this.actor.y;
        }
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // move to actor
        if (this.actor !== null) {
            this.entity.deltaMove(this.actor.x - this.preActorX, this.actor.y - this.preActorY);
            this.preActorX = this.actor.x;
            this.preActorY = this.actor.y;
        }

        // If damageable object is collided, damage
        for (const it of this.entity.collider.collisions) {
            const entity = Util.getCollidedEntity(this.entity, it);
            if (this.actor !== entity && BaseUtil.implementsOf(entity, IDamagable)) {
                entity.damage(1);
            }
        }
        return true;
    }
}
