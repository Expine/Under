/**
 * Common none state
 * - Determines the operation by AI according to the state and renders based on state
 * - Enable to set animation
 * - Base state for rendering state animation
 * - Basic information can be transferred to another state
 * - Render entity by entity own image ID for change type
 * - ### Does nothing but transfer gameover only if entity is died
 * @implements {UnderPlayerState}
 * @classdesc Common none state to do nothing but transfer gameover only if entity is died
 */
class CommonNoneState extends UnderPlayerState { // eslint-disable-line  no-unused-vars
    /**
     * Common none state constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Damaged target at registered entity
         * @protected
         * @type {IDamagable}
         */
        this.damagedTarget = null;
    }
    /**
     * Set entity for targeting
     * @param {AutonomyEntitiy} entity Entity for tageting
     */
    setEntity(entity) {
        super.setEntity(entity);
        if (BaseUtil.implementsOf(entity, IDamagable)) {
            this.damagedTarget = entity;
        }
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        if (this.damagedTarget.getHP() <= 0) {
            this.ai.changeState(`gameover`);
        }
        return false;
    }
}
