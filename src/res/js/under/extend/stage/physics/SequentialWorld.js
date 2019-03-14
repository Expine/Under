/**
 * Sequential world
 * - Performs a physical operation
 * - Registers entities and apply a physical operation
 * - ### Continually perform collision processing
 * @extends {PhysicalWorld}
 * @classdesc Sequential world to perform collision processing continually
 */
class SequentialWorld extends PhysicalWorld {
    /**
     * Sequential world constructor
     * @constructor
     * @param {number} [gravity=9.8] gravity of the world
     */
    constructor(gravity = 9.8) {
        super(gravity);

        /**
         * Collision data list
         * @protected
         * @type {Array<CollisionData>}
         */
        this.collisions = [];

        /**
         * Collision start index of list
         * @protected
         * @type {Array<number>}
         */
        this.collisionStartIndex = 0;
        /**
         * Size of collision data list
         * @protected
         * @type {number}
         */
        this.collisionSize = 0;

        /**
         * List of entities to act on
         * @protected
         * @type {Array<MutableEntity>}
         */
        this.actors = [];

        /**
         * List of entities not to act on
         * @protected
         * @type {Array<InfluentialEntity>}
         */
        this.notActors = [];

        /**
         * List of all entities
         * @protected
         * @type {Array<InfluentialEntity>}
         */
        this.entities = [];

        /**
         * Collision target entity list
         * @protected
         * @type {Array<InfluentialEntity>}
         */
        this.collisionTarget = [];

        // initialize
        for (let i = 0; i < 100; ++i) {
            const data = new LowerPriorityData();
            data.init();
            this.collisions.push(data);
        }
    }

    /**
     * Add entity in physical world
     * @override
     * @param {InfluentialEntity} entity Entity in physical world
     */
    addEntity(entity) {
        this.entities.push(entity);
        if (entity instanceof MutableEntity) {
            this.actors.push(entity);
        } else {
            this.notActors.push(entity);
        }
    }

    /**
     * Remove entity from physical world
     * @override
     * @param {InfluentialEntity} entity Entity to remove from physical world
     */
    removeEntity(entity) {
        let index = this.entities.indexOf(entity);
        if (index >= 0) {
            this.entities.splice(index, 1);
        }
        index = this.actors.indexOf(entity);
        if (index >= 0) {
            this.actors.splice(index, 1);
        }
        index = this.notActors.indexOf(entity);
        if (index >= 0) {
            this.notActors.splice(index, 1);
        }
    }

    /**
     * Get collision information now
     * @override
     * @param {Collider} collider Target collider
     * @return {Array<CollisionData>} Collision information now
     */
    getCollisionData(collider) {
        const ret = [];
        if (collider === null) {
            return ret;
        }
        let data = new LowerPriorityData();
        for (const it of this.entities) {
            const itCollider = it.collider;
            if (itCollider === null || it === collider.entity || !itCollider.enable) {
                continue;
            }
            if (collider.isCollisionRoughly(itCollider) && collider.isCollision(itCollider, data)) {
                ret.push(data);
                data = new LowerPriorityData();
            }
        }
        return ret;
    }

    /**
     * Get the total number of collisions
     * @override
     * @return {number} Total number of collisions
     */
    getCollisionSize() {
        return this.collisionSize;
    }

    /**
     * Update external force
     * @protected
     * @override
     * @param {number} dt Delta time
     */
    updateExternalForce(dt) {
        for (const target of this.actors) {
            if (target.body !== null) {
                target.body.enforce(0, this.gravity * target.material.mass * target.body.material.gravityScale);
            }
        }
    }

    /**
     * Prepare body
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    prepareBody(dt) {
        for (const target of this.actors) {
            if (target.body !== null) {
                target.body.prepare(dt);
            }
        }
    }

    /**
     * Update body
     * @protected
     * @override
     * @param {number} dt Delta time
     */
    updateBody(dt) {
        for (const target of this.actors) {
            if (target.body !== null) {
                target.body.update(dt);
            }
        }
    }

    /**
     * Update body to cleanup
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateBodyCleanup(dt) {
        for (const target of this.actors) {
            if (target.body !== null) {
                target.body.cleanup(dt);
            }
        }
    }

    /**
     * Initialize collision state
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    initCollision(dt) {
        // collision initialize
        for (let j = 0; j < this.collisionSize; ++j) {
            this.collisions[j].init();
        }
        this.collisionStartIndex = 0;
        this.collisionSize = 0;
        for (const it of this.entities) {
            if (it.collider !== null) {
                it.collider.init();
            }
        }
        this.collisionTarget = this.actors;
    }

    /**
     * Update collisions
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateCollision(dt) {
        // collision detection
        for (let i = 0; i < this.collisionTarget.length; ++i) {
            const target = this.collisionTarget[i];
            const targetCollider = target.collider;
            if (targetCollider === null || !targetCollider.enable) {
                continue;
            }
            // check actors
            for (let j = 0; j < this.actors.length; ++j) {
                const it = this.actors[j];
                const itCollider = it.collider;
                if (it === target || itCollider === null || !itCollider.enable || !targetCollider.isCollisionRoughly(itCollider) || !targetCollider.isCollision(itCollider, this.collisions[this.collisionSize]) || targetCollider.collisions.find((data) => Util.getCollidedEntity(target, data) === it)) {
                    continue;
                }
                // add collision data
                targetCollider.addCollision(this.collisions[this.collisionSize]);
                itCollider.addCollision(this.collisions[this.collisionSize]);
                if (++this.collisionSize >= this.collisions.length) {
                    const data = new LowerPriorityData();
                    data.init();
                    this.collisions.push(data);
                }
            }
            // check tiles
            for (const it of this.notActors) {
                const itCollider = it.collider;
                if (itCollider === null || !itCollider.enable || !targetCollider.isCollisionRoughly(itCollider) || !targetCollider.isCollision(itCollider, this.collisions[this.collisionSize]) || targetCollider.collisions.find((data) => Util.getCollidedEntity(target, data) === it)) {
                    continue;
                }
                // add collision data
                targetCollider.addCollision(this.collisions[this.collisionSize]);
                itCollider.addCollision(this.collisions[this.collisionSize]);
                if (++this.collisionSize >= this.collisions.length) {
                    const data = new LowerPriorityData();
                    data.init();
                    this.collisions.push(data);
                }
            }
        }
    }

    /**
     * Update collisions response
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateResponse(dt) {
        this.collisionTarget = [];
        // collision response
        for (let j = this.collisionStartIndex; j < this.collisionSize; ++j) {
            const it = this.collisions[j];
            if (it.colliding.collider.isResponse(it.collided.collider) && it.collided.collider.isResponse(it.colliding.collider)) {
                this.response.collisionResponse(it, dt);
                if (it.depth > 1.0e-4 && this.collisionTarget.indexOf(it.colliding) === -1) {
                    this.collisionTarget.push(it.colliding);
                }
                if (it.depth > 1.0e-4 && it.collided instanceof MutableEntity && this.collisionTarget.indexOf(it.collided) === -1) {
                    this.collisionTarget.push(it.collided);
                }
            }
        }
    }

    /**
     * Judge whether collision detection continue or not
     * @abstract
     * @protected
     * @param {number} dt Delta time
     * @return {boolean} Whether collision detection continue or not
     */
    judgeContinueCollision(dt) {
        let maxDepath = 1;
        for (let j = this.collisionStartIndex; j < this.collisionSize; ++j) {
            maxDepath = Math.max(maxDepath, this.collisions[j].depth);
        }
        this.collisionStartIndex = this.collisionSize;
        return this.collisionTarget.length > 0 && this.collisionSize < 10000 && maxDepath > 1;
    }
}
