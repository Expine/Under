import { HookObject } from "./HookObject";
import { RigidBody } from "../../../../../../under/base/stage/physics/body/RigidBody";
import { isIString } from "../../../../physics/body/IString";
import { MutableEntity } from "../../../../../../under/base/stage/entity/MutableEntity";

/**
 * Hook head object
 * - Implements as head
 * @extends {HookObject}
 * @classdesc Hook head object to implement as head
 */
export class HookHead extends HookObject {
    /**
     * Hook head original body
     * @protected
     * @type {RigidBody}
     */
    protected originalBody: RigidBody | null;

    /**
     * Hook head object constructor
     * @constructor
     * @param {number} restLength Hook rest length
     * @param {number} hookedLength Hook length of hooked
     * @param {number} childID Child id for generating child
     */
    constructor(restLength: number, hookedLength: number, childID: number) {
        super();
        this.originalBody = null;

        // initialize
        this.setHookInfo(null, null, restLength, hookedLength, childID);
    }

    /**
     * Hook center x position
     * @override
     * @protected
     * @return {number} Hook center x position
     */
    getHookX(): number {
        return this.x + Math.abs(this.width) / 2;
    }

    /**
     * Hook center x position
     * @override
     * @protected
     * @return {number} Hook center x position
     */
    getHookY(): number {
        return this.y + Math.abs(this.height) / 2;
    }

    /**
     * Hooked hook
     * @override
     */
    hooked() {
        super.hooked();
        if (this.originalBody !== null) {
            this.originalBody.enable = false;
        }
    }

    /**
     * Release hook
     * @override
     */
    release() {
        super.release();
        if (this.originalBody !== null) {
            this.originalBody.enable = true;
        }
    }

    /**
     * Whether the tip of the hook
     * @override
     * @return {boolean} Whether the tip of the hook
     */
    isHead(): boolean {
        return true;
    }

    /**
     * Initialize entity
     * @override
     */
    init() {
        super.init();

        if (isIString(this.body)) {
            this.string = this.body;
            const bodies = this.string.getBodies().filter((it) => it.getEntity() === this);
            this.originalBody = bodies.length === 0 ? null : bodies[0];
        }

        if (this.owner instanceof MutableEntity) {
            this.directionX = this.owner.directionX;
            this.directionY = -1;
        }
        this.setPosition(this.x + this.x - this.getHookX(), this.y + this.y - this.getHookY());
    }
}
