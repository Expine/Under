import { HookObject } from "./HookObject";
import { MutableEntity } from "../../../../../../under/base/stage/entity/MutableEntity";

/**
 * Hook player object
 * - Owner's representation so it does not exists on stage
 * @extends {HookObject}
 * @classdesc Hook player object that player's representation so it does not exists on stage
 */
export class HookOwner extends HookObject {
    /**
     * Hook center x position
     * @override
     * @return {number} Hook center x position
     */
    getHookX(): number {
        if (this.owner instanceof MutableEntity) {
            return this.owner.directionX >= 0 ? this.generatedX + this.owner.x + this.owner.width : this.owner.x - this.generatedX;
        } else {
            return this.x;
        }
    }

    /**
     * Hook center x position
     * @override
     * @return {number} Hook center x position
     */
    getHookY(): number {
        if (this.owner instanceof MutableEntity) {
            return this.owner.y - this.generatedY;
        } else {
            return this.y;
        }
    }

    /**
     * Hooked hook
     * @override
     */
    hooked() { }

    /**
     * Release hook
     * @override
     */
    release() { }

    /**
     * Destroy object
     * @override
     */
    destroy() { }

    /**
     * Initialize entity
     * @override
     */
    init() {
        super.init();
        if (this.owner instanceof MutableEntity && this.string !== null && this.owner !== null && this.owner.body !== null) {
            this.string.addBody(this.owner.body, this.owner.width + this.generatedX, -this.generatedY, this.string.getLength());
        }
    }
}
