/**
 * Rigid body
 * - ### Update entity by physical quantity
 * @interface
 * @classdesc Rigid body to update entity by phsycal quantity
 */
class RigidBody { // eslint-disable-line  no-unused-vars
    /**
     * Rigid body constructor
     * @constructor
     */
    constructor() {
        /**
         * Difference of previous x position (actural x velocity)
         * @type {number}
         */
        this.diffX = 0;
        /**
         * Difference of previous y position (actural y velocity)
         * @type {number}
         */
        this.diffY = 0;

        /**
         * Whether it is fixed for x direction or not
         * @type {boolean}
         */
        this.isFixX = false;
        /**
         * Whether it is fixed for y direction or not
         * @type {boolean}
         */
        this.isFixY = false;

        /**
         * Whether it is enabled or not
         * @type {boolean}
         */
        this.enable = true;

        /**
         * Mutable entity attaching rigid body
         * @protected
         * @type {MutableEntity}
         */
        this.entity = null;
        /**
         * Rigid material
         * @type {RigidMaterial}
         */
        this.material = null;
    }

    /**
     * Set mutable entity
     * @param {MutableEntity} entity Mutable entity
     */
    setEntity(entity) {
        this.entity = entity;
    }

    /**
     * Get entity attached it
     * @return {MutableEntity} Entity attached it
     */
    getEntity() {
        return this.entity;
    }

    /**
     * Set rigid material
     * @param {RigidMaterial} material Rigid material
     */
    setMaterial(material) {
        this.material = material;
    }

    /**
     * Get horizontal velocity of entity
     * @return {number} Horizontal velocity of entity
     */
    get velocityX() {
        return this.material.velocityX;
    }

    /**
     * Get vertical velocity of entityD
     * @return {number} Vertical velocity of entityD
     */
    get velocityY() {
        return this.material.velocityY;
    }

    /**
     * Get horizontal acceleration of entity
     * @return {number} Horizontal acceleration of entity
     */
    get accelerationX() {
        return this.material.accelerationX;
    }

    /**
     * Get vertical acceleration of entity
     * @return {number} Vertical acceleration of entity
     */
    get accelerationY() {
        return this.material.accelerationY;
    }

    /**
     * Reset rigid body state
     */
    reset() {
        this.material.reset();
        this.diffX = 0;
        this.diffY = 0;
        this.isFixX = false;
        this.isFixY = false;
    }

    /**
     * Set the value added to the next speed vector
     * @abstract
     * @param {number} vx X component of the velocity vector to be added
     * @param {number} vy Y component of the velocity vector to be added
     */
    setNextAddVelocity(vx, vy) {}

    /**
     * Apply force to objects
     * @abstract
     * @param {number} forceX Force in x direction
     * @param {number} forceY Force in y direction
     */
    enforce(forceX, forceY) {}

    /**
     * Initialize body
     * @abstract
     */
    init() {}

    /**
     * Prepare for updagte
     * @abstract
     * @param {number} dt delta time
     */
    prepare(dt) {}

    /**
     * Update rigid body information
     * @abstract
     * @protected
     */
    updateInfo(dt) {}

    /**
     * Update velocity
     * @abstract
     * @protected
     */
    updateVelocity(dt) {}

    /**
     * Update entity by velocity
     * @abstract
     * @protected
     */
    updateEntity(dt) {}

    /**
     * Update by rigid body
     * @param {number} dt delta time
     */
    update(dt) {
        this.updateInfo(dt);
        if (this.enable) {
            this.updateVelocity(dt);
            this.updateEntity(dt);
        }
    }

    /**
     * Cleanup body information
     * @abstract
     * @param {nuumber} dt Delta time
     */
    cleanup(dt) {}
}
