import { ImagedEntity } from "../../../../base/stage/entity/ImagedEntity";
import { IColliderable } from "../../../../base/stage/entity/interface/IColliderable";
import { Collider } from "../../../../base/stage/physics/collider/Collider";
import { Util } from "../../../util/Util";
import { Input } from "../../../../base/input/Input";
import { StageManager } from "../../../../base/stage/StageManager";
import { isIPlayable } from "../../../../base/stage/entity/interface/IPlayable";
import { InfluentialEntity } from "../../../../base/stage/entity/InfluentialEntity";

/**
 * Immutable event object
 * - Show sign
 * @extends {ImagedEntity}
 * @implements {IColliderable}
 * @classdesc Immutable event object to show sign
 */
export class DoorObject extends ImagedEntity implements IColliderable {
    /**
     * Transition stage name
     * @protected
     * @type {string}
     */
    protected transition: string | null;
    /**
     * Whether stage is replaced or not
     * @protected
     * @type {boolean}
     */
    protected isReplace: boolean;
    /**
     * Number of applying pop
     * @protected
     * @type {number}
     */
    protected popNumber: number;

    /**
     * Door collider for
     * @protected
     * @type {Collider}
     */
    protected doorCollider: Collider | null;

    /**
     * Whether transition is executing now or not
     * @protected
     * @type {boolean}
     */
    protected isTransitioning: boolean;

    /**
     * Influential event object constructor
     * @constructor
     * @param {string} [transition=null] Transition stage name
     * @param {boolean} [isReplace=false] Whether stage is replaced or not
     * @param {number} [popNumber=0] Number of applying pop
     */
    constructor(transition: string | null = null, isReplace: boolean = false, popNumber: number = 0) {
        super();

        this.transition = transition;
        this.isReplace = isReplace;
        this.popNumber = popNumber;
        this.doorCollider = null;
        this.isTransitioning = false;
    }

    /**
     * Set collider
     * @param {Collider} collider collider
     */
    setCollider(collider: Collider) {
        this.doorCollider = collider;
        this.doorCollider.setEntity(this);
        this.doorCollider.init();
    }

    /**
     * Get collider
     * @override
     * @return {Collider} Collider that object has
     */
    getCollider(): Collider | null {
        return this.doorCollider;
    }

    /**
     * Initialize entity
     * @override
     */
    init() {
        if (this.doorCollider !== null) {
            this.doorCollider.update();
        }
    }

    /**
     * Update entty
     * @override
     * @param {number} dt Delta time
     */
    update(dt: number) {
        // opening
        if (this.isTransitioning && this.image !== null) {
            super.update(dt);
            if (Util.canEnd(this.image)) {
                // transition
                Input.key.setEnable(true);
                for (let i = 0; i < this.popNumber; ++i) {
                    StageManager.it.popStage();
                }
                if (this.transition !== null) {
                    if (this.isReplace) {
                        StageManager.it.replaceStage(this.transition);
                    } else {
                        StageManager.it.pushStage(this.transition);
                    }
                }
                this.isTransitioning = false;
            }
            return;
        }
        // open
        if (Input.key.isPress(Input.key.up()) && this.stage !== null && this.doorCollider !== null) {
            const physic = this.stage.getPhysicalWorld();
            if (physic !== null) {
                for (const it of physic.getCollisionData(this.doorCollider)) {
                    const you = Util.getCollidedEntity(<unknown>this as InfluentialEntity, it);
                    if (isIPlayable(you) && Util.onGround(you)) {
                        this.isTransitioning = true;
                        Input.key.setEnable(false);
                    }
                }
            }
        }
    }
}
