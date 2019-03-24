import { NormalPunchState } from "../normal/NormalPunchState";
import { Entity } from "../../../../../under/base/stage/entity/Entity";
import { MutableEntity } from "../../../../../under/base/stage/entity/MutableEntity";

/**
 * Wild claw state
 * - ### Attacks by claw
 * @extends {NormalPunchState}
 * @classdesc Wild claw state to attack by claw
 */
export class WildClawState extends NormalPunchState {
    /**
     *
     * Make attack object
     * @protected
     * @return {Entity} Attack object
     */
    makeAttackObject(): Entity | null {
        if (this.entity === null || this.entity.stage === null) {
            return null;
        }
        const attack = this.entity.stage.addEntityByID(200002, {
            x: this.entity.x + (this.entity.directionX === 1 ? this.entity.width - 22 : -26),
            y: this.entity.y + 8,
            z: this.entity.z + 1,
            owner: this.entity,
        });
        if (attack instanceof MutableEntity) {
            attack.setDirection(this.entity.directionX);
        }
        return attack;
    }
    /**
     * Update state
     * @override
     * @param {number} dt Delta time
     */
    update(dt: number) {
        if (this.entity !== null) {
            const image = this.entity.getImage();
            if (image !== null) {
                image.update(dt);
            }
        }
        super.update(dt);
    }
}
