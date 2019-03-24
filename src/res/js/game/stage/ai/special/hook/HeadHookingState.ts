import { HookingState } from "./HookingState";
import { isIHook } from "../../../entity/interface/IHook";
import { Util } from "../../../../../under/extend/util/Util";

/**
 * Head hooking state
 * - Transition to hooked state
 * @extends {HookingState}
 * @classdesc Head Hooking state for transition to hooked sate
 */
export class HeadHookingState extends HookingState {
    /**
     * Count during descent
     * @protected
     * @type {number}
     */
    protected descentCount: number;

    /**
     * Head hooking state constructor
     * @constructor
     */
    constructor() {
        super();
        this.descentCount = 0;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt: number): boolean {
        super.apply(dt);
        if (this.entity === null || this.entity.body === null || this.entity.stage === null || this.entity.collider === null) {
            return true;
        }
        // set direction
        const vx = Math.sign(this.entity.body.velocityX);
        const vy = Math.sign(this.entity.body.velocityY);
        this.entity.setDirection(vx === 0 ? undefined : vx, vy === 0 ? undefined : vy);
        // check hook
        if (this.hook === null) {
            return true;
        }
        // auto release
        if (vy > 0 && this.descentCount++ >= 5) {
            const hooks = this.entity.stage.getEntitiesByInterface(isIHook);
            if (hooks.length >= 1) {
                for (const it of hooks) {
                    if (it.getActor() === this.hook.getActor()) {
                        it.release();
                    }
                }
            }
            return true;
        }
        // check collisions
        for (const it of this.entity.collider.collisions) {
            if (Util.isCollidedWithDirection(it, this.entity, this.entity.directionX, this.entity.directionY)) {
                const you = Util.getCollidedEntity(this.entity, it);
                if (you.collider !== null && (!you.collider.isResponse(this.entity.collider) || !this.entity.collider.isResponse(you.collider))) {
                    continue;
                }
                if (isIHook(you) && you.getActor() === this.hook.getActor()) {
                    continue;
                }
                // hook
                this.hook.hooked();
                if (this.ai !== null) {
                    this.ai.changeState(`hooked`);
                }
                break;
            }
        }
        return true;
    }
}
