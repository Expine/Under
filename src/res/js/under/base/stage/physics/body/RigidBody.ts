import { RigidMaterial } from "./RigidMaterial";
import { MutableEntity } from "../../entity/MutableEntity";

/**
 * Rigid body
 * - Update entity by physical quantity
 * @abstract
 * @classdesc Rigid body to update entity by phsycal quantity
 */
export abstract class RigidBody {
    /**
     * Whether push back is not performe
     * @type {boolean}
     */
    fixed: boolean;
    /**
     * Whether it is constrained in a certain direction or not
     * @type {Array<boolean>}
     */
    asGrounds: Array<boolean>

    /**
     * Difference of previous x position (actural x velocity)
     * @type {number}
     */
    diffX: number;
    /**
     * Difference of previous y position (actural y velocity)
     * @type {number}
     */
    diffY: number;

    /**
     * Whether it is enabled or not
     * @type {boolean}
     */
    enable: boolean;

    /**
     * Mutable entity attaching rigid body
     * @protected
     * @type {MutableEntity}
     */
    entity: MutableEntity | null;
    /**
     * Rigid material
     * @type {RigidMaterial}
     */
    material: RigidMaterial | null;

    /**
     * Rigid body constructor
     * @constructor
     * @param {boolean} fixed Whether push back is not performed
     */
    constructor(fixed: boolean) {
        this.fixed = fixed;
        this.asGrounds = [];
        this.diffX = 0;
        this.diffY = 0;
        this.enable = true;
        this.entity = null;
        this.material = null;
    }

    /**
     * Set mutable entity
     * @param {MutableEntity} entity Mutable entity
     */
    setEntity(entity: MutableEntity) {
        this.entity = entity;
    }

    /**
     * Get entity attached it
     * @return {MutableEntity} Entity attached it
     */
    getEntity(): MutableEntity | null {
        return this.entity;
    }

    /**
     * Set rigid material
     * @param {RigidMaterial} material Rigid material
     */
    setMaterial(material: RigidMaterial) {
        this.material = material;
    }

    /**
     * Get horizontal velocity of entity
     * @return {number} Horizontal velocity of entity
     */
    get velocityX(): number {
        return this.material === null ? 0 : this.material.velocityX;
    }

    /**
     * Get vertical velocity of entityD
     * @return {number} Vertical velocity of entityD
     */
    get velocityY(): number {
        return this.material === null ? 0 : this.material.velocityY;
    }

    /**
     * Get horizontal acceleration of entity
     * @return {number} Horizontal acceleration of entity
     */
    get accelerationX(): number {
        return this.material === null ? 0 : this.material.accelerationX;
    }

    /**
     * Get vertical acceleration of entity
     * @return {number} Vertical acceleration of entity
     */
    get accelerationY(): number {
        return this.material === null ? 0 : this.material.accelerationY;
    }

    /**
     * Whether to apply reflection only to the object
     * @return {boolean} Whether to apply reflection only to the object
     */
    isFixed(): boolean {
        return this.fixed;
    }

    /**
     * Reset rigid body state
     */
    reset() {
        if (this.material !== null) {
            this.material.reset();
        }
        this.diffX = 0;
        this.diffY = 0;
    }

    /**
     * Set the value added to the next speed vector
     * @abstract
     * @param {number} vx X component of the velocity vector to be added
     * @param {number} vy Y component of the velocity vector to be added
     */
    abstract setNextAddVelocity(vx: number, vy: number): void;

    /**
     * Apply force to objects
     * @abstract
     * @param {number} forceX Force in x direction
     * @param {number} forceY Force in y direction
     */
    abstract enforce(forceX: number, forceY: number): void;

    /**
     * Initialize body
     * @abstract
     */
    abstract init(): void;

    /**
     * Prepare for updagte
     * @abstract
     * @param {number} dt delta time
     */
    abstract prepare(dt: number): void;

    /**
     * Update rigid body information
     * @protected
     * @param {number} dt delta time
     */
    updateInfo(_dt: number) {
        for (let i = 0; i < 9; ++i) {
            this.asGrounds[i] = false;
        }
    }

    /**
     * Update velocity
     * @abstract
     * @protected
     * @param {number} dt delta time
     */
    abstract updateVelocity(dt: number): void;

    /**
     * Update entity by velocity
     * @abstract
     * @protected
     * @param {number} dt delta time
     */
    abstract updateEntity(dt: number): void;

    /**
     * Update by rigid body
     * @param {number} dt delta time
     */
    update(dt: number) {
        this.updateInfo(dt);
        if (this.enable) {
            this.updateVelocity(dt);
            this.updateEntity(dt);
        }
    }

    /**
     * Cleanup body information
     * @abstract
     * @param {number} dt Delta time
     */
    abstract cleanup(dt: number): void;
}
