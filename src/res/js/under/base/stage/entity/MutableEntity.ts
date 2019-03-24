import { InfluentialEntity } from "./InfluentialEntity";
import { RigidBody } from "../physics/body/RigidBody";
import { isIDirectionalImage } from "../../resources/image/IDirectionalImage";

/**
 * Mmutable entity
 * - It is not fixed and can be moved
 * @extends {InfluentialEntity}
 * @classdesc Mmutable entity that is not fixed and can be moved
 */
export abstract class MutableEntity extends InfluentialEntity {
    /**
     * Entity body
     * @type {RigidBody}
     */
    body: RigidBody | null;

    /**
     * X direction of entity
     * @type {number}
     */
    directionX: number;
    /**
     * Y direction of entity
     * @type {number}
     */
    directionY: number;

    /**
     * Mutable entity constructor
     * @constructor
     */
    constructor() {
        super();

        this.directionX = 0;
        this.directionY = 0;
        this.body = null;
    }

    /**
     * Set rigid body
     * @param {RigidBody} body rigid body
     */
    setRigidBody(body: RigidBody) {
        this.body = body;
        // initialize
        if (this.body !== null) {
            body.setEntity(this);
            body.init();
        }
    }

    /**
     * Set direction of entity
     * @param {number} [directionX = this.directionX] Direction of x
     * @param {number} [directionY = this.directionY] Direction of y
     */
    setDirection(directionX: number = this.directionX, directionY: number = this.directionY) {
        this.directionX = directionX;
        this.directionY = directionY;

        if (isIDirectionalImage(this.image)) {
            this.image.setDirection(directionX, directionY);
        }
    }

    /**
     * Move entity relatively
     * @param {number} dx Relative movement amount in x direction
     * @param {number} dy Relative movement amount in y direction
     */
    deltaMove(dx: number, dy: number) {
        this.setPosition(this.x + dx, this.y + dy);
        if (this.collider !== null) {
            this.collider.update();
        }
    }
}
