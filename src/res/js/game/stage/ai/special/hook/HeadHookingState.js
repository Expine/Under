/**
 * Head hooking state
 * - Determines the operation by AI according to the state and renders based on state
 * - Hook condition before collision to create post hook
 * - ### Transition to hooked state
 * @extends {HookingState}
 * @classdesc Head Hooking state for transition to hooked sate
 */
class HeadHookingState extends HookingState { // eslint-disable-line  no-unused-vars
    /**
     * Head hooking state constructor
     * @constructor
     * @param {IHook} hook Hook for getting hook information
     * @param {IString} string String for getting string information
     * @param {IJoint} joint Joint for jointing to collision object
     */
    constructor(hook, string, joint) {
        super(hook);

        /**
         * String for getting string information
         * @protected
         * @type {IString}
         */
        this.string = string;

        /**
         * Joint for jointing to collision object
         * @protected
         * @type {IJoint}
         */
        this.joint = joint;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        super.apply(dt);
        // set direction
        let vx = Math.sign(this.entity.body.velocityX);
        let vy = Math.sign(this.entity.body.velocityY);
        this.entity.directionX = vx == 0 ? this.entity.directionX : vx;
        this.entity.directionY = vy == 0 ? this.entity.directionY : vy;
        // check collisions
        for (let it of this.string.getCollisions()) {
            if (it.e1 !== this.entity && it.e2 !== this.entity) {
                continue;
            }
            let dot = it.nx * this.entity.directionX + it.ny * this.entity.directionY;
            if ((it.e1 === this.entity && dot > 0) || (it.e2 === this.entity && dot < 0)) {
                let you = Util.getCollidedEntity(this.entity, it);
                if (BaseUtil.implementsOf(you, IHook) && you.getActor() === this.entity.getActor()) {
                    continue;
                }
                // hook
                this.entity.hooked();
                let youWidth = (you.collider.aabb.endX - you.collider.aabb.startX) / 2;
                let youHeight = (you.collider.aabb.endY - you.collider.aabb.startY) / 2;
                let meWidth = (this.entity.collider.aabb.endX - this.entity.collider.aabb.startX) / 2;
                let meHeight = (this.entity.collider.aabb.endY - this.entity.collider.aabb.startY) / 2;
                this.joint.joint(you, youWidth, youHeight, (Math.max(youWidth, youHeight) + Math.max(meWidth, meHeight)) * 2);
                this.ai.changeState(`hooked`);
                break;
            }
        }
        return true;
    }
}
