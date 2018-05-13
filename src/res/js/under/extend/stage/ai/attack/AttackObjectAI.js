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
     * @param {Entity} actor Owned entity
     */
    constructor(actor) {
        super();

        /**
         * Owned entity
         * @protected
         * @type {Entity}
         */
        this.actor = actor;

        /**
         * Previous actor x position
         * @protected
         * @type {number}
         */
        this.preActorx = this.actor.x;
        /**
         * Previous actor y position
         * @protected
         * @type {number}
         */
        this.preActory = this.actor.y;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // move to actor
        this.entity.deltaMove(this.actor.x - this.preActorx, this.actor.y - this.preActory);
        this.preActorx = this.actor.x;
        this.preActory = this.actor.y;

        // If damageable object is collided, damage
        for (let it of this.entity.collider.collisions) {
            let entity = Util.getCollidedEntity(this.actor, it);
            if (this.actor !== entity && BaseUtil.implementsOf(entity, IDamagable)) {
                entity.damage(1);
            }
        }
        return true;
    }
}
