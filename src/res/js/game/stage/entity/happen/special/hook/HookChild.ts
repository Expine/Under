import { HookObject } from "./HookObject";

/**
 * Hook child object
 * - Implements as rectangle
 * @extends {HookObject}
 * @classdesc Hook child object to implement as rectangle
 */
export class HookChild extends HookObject {
    /**
     * Hook center x position
     * @override
     * @protected
     * @return {number} Hook center x position
     */
    getHookX(): number {
        return this.x + this.width / 2;
    }

    /**
     * Hook center x position
     * @override
     * @protected
     * @return {number} Hook center x position
     */
    getHookY(): number {
        return this.y + this.height / 2;
    }

    /**
     * Initialize entity
     * @override
     */
    init() {
        super.init();
        this.setPosition(this.x + this.x - this.getHookX(), this.y + this.y - this.getHookY());
    }
}
