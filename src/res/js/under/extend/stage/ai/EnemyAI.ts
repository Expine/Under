import { AI } from "../../../base/stage/ai/AI";
import { AutonomyEntity } from "../../../base/stage/entity/AutonomyEntity";
import { Util } from "../../util/Util";
import { isIDamagable } from "../../../base/stage/entity/interface/IDamagable";
import { isIPlayable } from "../../../base/stage/entity/interface/IPlayable";

/**
 * Enemy AI
 * - Damages to the collided opponent
 * @extends {AI}
 * @classdesc Enemy AI to damage to the conflicting opponent
 */
export class EnemyAI extends AI {
    /**
     * Base delegation AI
     * @protected
     * @type {AI}
     */
    protected baseAI: AI;

    /**
     * X direction of entity before applying
     * @protected
     * @type {number}
     */
    protected preDirectionX: number;
    /**
     * Y direction of entity before applying
     * @protected
     * @type {number}
     */
    protected preDirectionY: number;

    /**
     * Enemy AI constructor
     * @constructor
     * @param {AI} baseAI Base delegation AI
     */
    constructor(baseAI: AI) {
        super();

        this.baseAI = baseAI;
        this.preDirectionX = 0;
        this.preDirectionY = 0;
    }

    /**
     * Set autonomy entity
     * @override
     * @param {AutonomyEntity} entity Autonomy entity
     */
    setEntity(entity: AutonomyEntity) {
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
    update(dt: number) {
        this.baseAI.update(dt);
        if (this.entity !== null) {
            this.preDirectionX = this.entity.directionX;
            this.preDirectionY = this.entity.directionY;
        }
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt: number): boolean {
        // apply base AI
        if (this.baseAI.apply(dt) && this.entity !== null && this.entity.collider !== null) {
            // check collided
            for (const it of this.entity.collider.collisions) {
                if (Util.isCollidedWithDirection(it, this.entity, this.preDirectionX, this.preDirectionY)) {
                    const opponent = Util.getCollidedEntity(this.entity, it);
                    if (isIDamagable(opponent) && isIPlayable(opponent)) {
                        opponent.damage(1);
                    }
                }
                return true;
            }
        }
        return false;
    }
}
