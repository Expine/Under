/**
 * String body
 * - Update entity by physical quantity
 * - It can add or remove rigid body
 * - ### Connects all rigid bodies and processes them all together
 * @implements {RigidBody}
 * @classdesc String body to connect all rigid bodies and process them all together
 */
class StringBody extends RigidBody /* , IString */ { // eslint-disable-line  no-unused-vars
    /**
     * String body constructor
     * @constructor
     * @param {RigidBody} body Original body for delegation
     * @param {number} length Jointing length
     */
    constructor(body, length) {
        super();

        /**
         * Original body for delegation
         * @protected
         * @type {RigidBody}
         */
        this.body = body;

        /**
         * Jointing body list
         * @protected
         * @type {Array<RigidBody>}
         */
        this.jointingList = [];

        /**
         * String length per unit
         * @protected
         * @type {number}
         */
        this.length = length;

        // initialize
        this.jointingList.push(body);
    }

    /**
     * Set mutable entity
     * @override
     * @param {MutableEntity} entity Mutable entity
     */
    setEntity(entity) {
        super.setEntity(entity);
        this.body.setEntity(entity);
    }

    /**
     * Initialize body
     * @override
     */
    init() {
        this.body.init();
    }

    /**
     * Set the value added to the next speed vector
     * @override
     * @param {number} vx X component of the velocity vector to be added
     * @param {number} vy Y component of the velocity vector to be added
     */
    setNextAddVelocity(vx, vy) {
        this.body.setNextAddVelocity(vx, vy);
    }

    /**
     * Apply force to objects
     * @param {number} forceX Force in x direction
     * @param {number} forceY Force in y direction
     */
    enforce(forceX, forceY) {
        this.body.enforce(forceX, forceY);
    }

    /**
     * Update by rigid body
     * @override
     * @param {number} dt delta time
     */
    update(dt) {
        for (let it of this.jointingList) {
            it.enable = true;
            it.update(dt);
            it.enable = false;
        }
        this.body.cleanup();
    }

    /**
     * Get string length
     * @override
     * @return {number} String length
     */
    getLength() {
        return this.length;
    }

    /**
     * Add entity for string
     * @override
     * @param {RigidBody} jointing Jointing body
     * @param {number} jointingX Jointing x position
     * @param {number} jointingY Jointing y position
     */
    addBody(jointing) {
        this.jointingList.push(jointing);
        // disable
        jointing.enable = false;
    }

    /**
     * Remove body from string
     * @override
     * @param {RigidBody} body Joiting body
     */
    removeBody(body) {
        let index = this.jointingList.indexOf(jointed);
        if (index >= 0) {
            this.jointingList.splice(index, 1);
        }
        body.enable = true;
    }
}
