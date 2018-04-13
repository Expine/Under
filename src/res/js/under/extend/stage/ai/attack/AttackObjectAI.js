/**
 * Attack object AI
 * AI that is attached to attack object
 * @implements {AI}
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
    }

    /**
     * Initialize AI
     * @override
     */
    init() {
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
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        // move to actor
        this.entity.deltaMove(this.actor.x - this.preActorx, this.actor.y - this.preActory);
        this.preActorx = this.actor.x;
        this.preActory = this.actor.y;
        return true;
    }
}
