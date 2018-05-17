/**
 * Common judge state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - Basic information can be transferred to another state
 * - Render entity by entity own image ID for change type
 * - ### Does nothing but transfer gameover only if entity is died
 * @extends {UnderPlayerState}
 * @classdesc Common judge state to do nothing but transfer gameover only if entity is died
 */
class CpmmonJudgeState extends UnderPlayerState { // eslint-disable-line  no-unused-vars
    /**
     * Common judge state constructor
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
     * Initialize
     * @override
     */
    init() {
        super.init();
        if (BaseUtil.implementsOf(this.entity, IDamagable)) {
            this.damagedTarget = this.entity;
        }
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        if (this.damagedTarget !== null && this.damagedTarget.getHP() <= 0) {
            this.ai.changeState(`gameover`);
            return true;
        }
        return false;
    }
}
