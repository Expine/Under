import { PossessedObject } from "../PossessedObject";
import { IBreakable } from "../../../../../base/stage/entity/interface/IBreakable";

/**
 * Attack object
 * - Object indicating attack that have lifespan
 * @extends {PossessedObject}
 * @implements {IBreakable}
 * @classdesc Attack object indicating attack that have lifespan
 */
export class AttackObject extends PossessedObject implements IBreakable {
    /**
     * Lifespan of attack object
     * @protected
     * @type {number}
     */
    protected lifespan: number;

    /**
     * Attack object constructor
     * @constructor
     * @param {number} lifespan Lifespan of attack object
     */
    constructor(lifespan: number) {
        super();

        this.lifespan = lifespan;
    }

    /**
     * Destroy object
     * @override
     */
    destroy() {
        if (this.stage !== null) {
            this.stage.removeEntity(this);
        }
    }

    /**
     * Update object
     * @override
     * @param {number} dt Delta time
     */
    update(dt: number) {
        this.lifespan -= dt;
        if (this.lifespan < 0) {
            this.destroy();
            return;
        }
        super.update(dt);
    }
}
