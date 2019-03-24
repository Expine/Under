import { PreciseBody } from "./PreciseBody";
import { Entity } from "../../../../base/stage/entity/Entity";
import { MutableEntity } from "../../../../base/stage/entity/MutableEntity";
import { Util } from "../../../util/Util";

/**
 * Joint body
 * - Fits within a certain length range of some object
 * @extends {MaxAdoptBody}
 * @classdesc Joint body to fit within a certain length range of some object
 */
export class JointBody extends PreciseBody {
    /**
     * Jointing x position
     * @protected
     * @type {number}
     */
    protected jointingX: number;
    /**
     * Jointing y position
     * @protected
     * @type {number}
     */
    protected jointingY: number;

    /**
     * Jointed entity
     * @protected
     * @type {Entity}
     */
    protected jointed: Entity | null;
    /**
     * Jointed x position
     * @protected
     * @type {number}
     */
    protected jointedX: number;
    /**
     * Jointed y position
     * @protected
     * @type {number}
     */
    protected jointedY: number;

    /**
     * Jointed length
     * @protected
     * @type {number}
     */
    protected length: number;

    /**
     * Joint body constructor
     * @constructor
     * @param {boolean} fixed Whether push back is not performed
     * @param {number} jointingX Jointing x position (object that attached it)
     * @param {number} jointingY Jointing y position (object that attached it)
     */
    constructor(fixed: boolean, jointingX: number, jointingY: number) {
        super(fixed);

        this.jointingX = jointingX;
        this.jointingY = jointingY;
        this.jointed = null;
        this.jointedX = 0;
        this.jointedY = 0;
        this.length = 0;
    }

    /**
     * Joint to something
     * @override
     * @param {Entity} jointed Jointed entity
     * @param {number} jointedX Jointed x position
     * @param {number} jointedY Jointed y position
     * @param {number} length Jointed length
     */
    joint(jointed: Entity, jointedX: number, jointedY: number, length: number) {
        this.jointed = jointed;
        this.jointedX = jointedX;
        this.jointedY = jointedY;
        this.length = length;
    }

    /**
     * Unjoint
     * @override
     */
    unjoint() {
        this.jointed = null;
    }

    /**
     * Update velocity
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateVelocity(dt: number) {
        if (this.jointed !== null && this.material !== null) {
            if (this.jointed instanceof MutableEntity) {
                if (this.jointed.body !== null) {
                    this.material.velocityX = this.jointed.body.velocityX;
                    this.material.velocityY = this.jointed.body.velocityY;
                }
            } else {
                this.material.velocityX = 0;
                this.material.velocityY = 0;
            }
        } else {
            super.updateVelocity(dt);
        }
    }

    /**
     * Update entity by velocity
     * @override
     * @param {number} dt Delta time
     */
    updateEntity(dt: number) {
        super.updateEntity(dt);
        if (this.jointed !== null && this.jointed instanceof MutableEntity && this.entity !== null && this.entity.collider !== null) {
            const ex = this.entity.directionX >= 0 ? this.entity.x + this.jointingX : this.entity.x + this.entity.width - this.jointingX;
            const ey = this.entity.directionY > 0 ? this.entity.y + this.jointingY : this.entity.y + this.entity.height - this.jointingY;
            const jx = this.jointed.directionX >= 0 ? this.jointed.x + this.jointedX : this.jointed.x + this.jointed.width - this.jointedX;
            const jy = this.jointed.directionY > 0 ? this.jointed.y + this.jointedY : this.jointed.y + this.jointed.height - this.jointedY;
            let dx = jx - ex;
            let dy = jy - ey;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d > this.length) {
                const l = d - this.length;
                for (const it of this.entity.collider.collisions) {
                    if (Util.isCollidedWithXDirection(it, this.entity, dx)) {
                        if (this.length < Math.abs(dx)) {
                            dy = dy * d / l + Math.sign(dy);
                        }
                        dx = 0;
                    }
                    if (Util.isCollidedWithYDirection(it, this.entity, dy)) {
                        if (this.length < Math.abs(dy)) {
                            dx = dx * d / l + Math.sign(dx);
                        }
                        dy = 0;
                    }
                }
                this.entity.deltaMove(l * dx / d, l * dy / d);
            }
        }
    }
}
