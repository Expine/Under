/**
 * Enemy AI
 * - Determines the behavior of an entity
 * - ### Damages to the collided opponent
 * @extends {AI}
 * @classdesc Enemy AI to damage to the conflicting opponent
 */
class EnemyAI extends AI { // eslint-disable-line  no-unused-vars
    /**
     * Enemy AI constructor
     * @constructor
     * @param {AI} baseAI Base delegation AI
     */
    constructor(baseAI) {
        super();

        /**
         * Base delegation AI
         * @protected
         * @type {AI}
         */
        this.baseAI = baseAI;

        /**
         * X direction of entity before applying
         * @protected
         * @type {number}
         */
        this.preDirectionX = 0;
        /**
         * Y direction of entity before applying
         * @protected
         * @type {number}
         */
        this.preDirectionY = 0;
    }

    /**
     * Set autonomy entity
     * @override
     * @param {AutonomyEntity} entity Autonomy entity
     */
    setEntity(entity) {
        super.setEntity(entity);
        this.baseAI.setEntity(entity);
    }

    /**
     * Initialize AI
     * @override
     */
    init() {
        this.baseAI.init();
    }

    /**
     * Update AI
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        this.baseAI.update(dt);
        this.preDirectionX = this.entity.directionX;
        this.preDirectionY = this.entity.directionY;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // apply base AI
        if (this.baseAI.apply(dt)) {
            // check collided
            for (const it of this.entity.collider.collisions) {
                if ((it.colliding === this.entity && it.nx * this.preDirectionX + it.ny * this.preDirectionY > 0) || (it.collided === this.entity && it.nx * this.preDirectionX + it.ny * this.preDirectionY < 0)) {
                    const opponent = Util.getCollidedEntity(this.entity, it);
                    if (BaseUtil.implementsOf(opponent, IDamagable)) {
                        opponent.damage(1);
                    }
                }
            }
            return true;
        }
        return false;
    }
}
