/**
 * Sequential world
 * - Performs a physical operation
 * - Registers entities and apply a physical operation
 * - ### Continually perform collision processing
 * @implements {PhysicalWorld}
 * @classdesc Sequential world to perform collision processing continually
 */
class SequentialWorld extends PhysicalWorld { // eslint-disable-line  no-unused-vars
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

        // initialize
        for (let i = 0; i < 100; ++i) {
            this.collisions.push(new CollisionData(null, null, 0, 0, 0, -1000000000, 0));
        }
    }

    /**
     * Add entity as actior
     * @override
     * @param {MutableEntity} actor Entity as actor
     */
    addActor(actor) {
        this.actors.push(actor);
        let index = this.notActors.indexOf(actor);
        if (index != -1) {
            this.notActors.splice(index, 1);
        }
    }

    /**
     * Add entity in physical world
     * @override
     * @param {InfluentialEntity} entity Entity in physical world
     */
    addEntity(entity) {
        this.entities.push(entity);
        if (this.actors.indexOf(entity) == -1) {
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
     * @return {Array<CollisionData>} Collision information now
     */
    getCollisionData(entity) {
        let ret = [];
        if (entity.collider === null) {
            return ret;
        }
        let data = new CollisionData();
        for (let it of this.entities) {
            let itCollider = it.collider;
            if (itCollider === null || it === entity) {
                continue;
            }
            if (entity.collider.isCollisionRoughly(itCollider) && entity.collider.isCollision(itCollider, data)) {
                ret.push(data);
                data = new CollisionData();
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
        for (let target of this.actors) {
            if (target.body !== null) {
                target.body.enforce(0, this.gravity * target.material.mass);
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
        for (let target of this.actors) {
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
        for (let target of this.actors) {
            if (target.body !== null) {
                target.body.cleanup(dt);
            }
        }
    }

    /**
     * Update collisions
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateCollision(dt) {
        // collision initialize
        for (let j = 0; j < this.collisionSize; ++j) {
            this.collisions[j].py = -1000000000;
        }
        this.collisionSize = 0;
        for (let it of this.entities) {
            if (it.collider !== null) {
                it.collider.init();
            }
        }

        // collision detection
        for (let i = 0; i < this.actors.length; ++i) {
            let target = this.actors[i];
            let targetCollider = target.collider;
            if (targetCollider === null) {
                continue;
            }
            for (let j = i + 1; j < this.actors.length; ++j) {
                let it = this.actors[j];
                let itCollider = it.collider;
                if (itCollider === null || it === target || !targetCollider.isCollisionRoughly(itCollider) || !targetCollider.isCollision(itCollider, this.collisions[this.collisionSize])) {
                    continue;
                }
                let same = false;
                for (let j = 0; j < this.collisionSize; ++j) {
                    let data = this.collisions[j];
                    if ((data.e1 === target && data.e2 === it) || (data.e2 === target && data.e1 === it)) {
                        same = true;
                        break;
                    }
                }
                if (same) {
                    this.collisions[this.collisionSize].py = -1000000000;
                    continue;
                }
                // add collision data
                targetCollider.addCollision(this.collisions[this.collisionSize]);
                itCollider.addCollision(this.collisions[this.collisionSize]);
                if (++this.collisionSize >= this.collisions.length) {
                    this.collisions.push(new CollisionData(null, null, 0, 0, 0, -1000000000, 0));
                }
            }
        }
        for (let target of this.actors) {
            let targetCollider = target.collider;
            if (targetCollider === null) {
                continue;
            }
            for (let it of this.notActors) {
                let itCollider = it.collider;
                if (itCollider === null || it === target || !targetCollider.isCollisionRoughly(itCollider) || !targetCollider.isCollision(itCollider, this.collisions[this.collisionSize])) {
                    continue;
                }
                let same = false;
                for (let j = 0; j < this.collisionSize; ++j) {
                    let data = this.collisions[j];
                    if ((data.e1 === target && data.e2 === it) || (data.e2 === target && data.e1 === it)) {
                        same = true;
                        break;
                    }
                }
                if (same) {
                    this.collisions[this.collisionSize].py = -1000000000;
                    continue;
                }
                // add collision data
                targetCollider.addCollision(this.collisions[this.collisionSize]);
                itCollider.addCollision(this.collisions[this.collisionSize]);
                if (++this.collisionSize >= this.collisions.length) {
                    this.collisions.push(new CollisionData(null, null, 0, 0, 0, -1000000000, 0));
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
        // collision response
        let sorted = this.collisions.sort((a, b) => a.py > b.py ? -1 : a.py < b.py ? 1 : 0);
        for (let j = 0; j < this.collisionSize; ++j) {
            let it = sorted[j];
            if (it.e1.collider.isResponse && it.e2.collider.isResponse) {
                this.response.collisionResponse(it, dt);
            }
            it.py = -1000000000;
        }
    }
}
