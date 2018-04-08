/**
 * Sequential world
 * Continually perform collision processing
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
        this.collisions.push(new CollisionData(null, null, 0, 0, 0, -1000000000, 0));

        /**
         * Size of collision data list
         * @protected
         * @type {number}
         */
        this.collisionSize = 0;

        /**
         * List of entities to act on
         * @protected
         * @type {Array<Entity>}
         */
        this.actors = [];

        /**
         * List of all entities
         * @protected
         * @type {Array<Entity>}
         */
        this.entities = [];
    }

    /**
     * Add entity as actior
     * @override
     * @param {Entity} actor Entity as actor
     */
    addActor(actor) {
        this.actors.push(actor);
    }

    /**
     * Add entity in physical world
     * @override
     * @param {Entity} entity Entity in physical world
     */
    addEntity(entity) {
        this.entities.push(entity);
    }

    /**
     * Remove entity from physical world
     * @override
     * @param {Entity} entity Entity to remove from physical world
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
    }

    /**
     * Get collision information
     * @override
     * @return {Array<CollisionData>} Collision information
     */
    getCollisionData(entity) {
        let ret = [];
        if (entity.collider === undefined) {
            return ret;
        }
        let data = new CollisionData();
        for (let it of this.entities) {
            let itCollider = it.collider;
            if (itCollider === undefined || !itCollider.enable || it === entity) {
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
     * Update physical world
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        Timer.it.startTimer(`body`);
        // body update
        for (let target of this.actors) {
            if (target.body !== undefined && target.body.enable) {
                target.body.enforce(0, this.gravity * target.material.mass);
                target.body.update(dt);
            }
        }
        Timer.it.stopTimer(`body`);

        // collision initialize
        for (let j = 0; j < this.collisionSize; ++j) {
            this.collisions[j].py = -1000000000;
        }
        this.collisionSize = 0;
        for (let it of this.entities) {
            if (it.collider !== undefined) {
                it.collider.init();
            }
        }

        Timer.it.startTimer(`collide`);
        // collision detection
        for (let target of this.actors) {
            let targetCollider = target.collider;
            if (targetCollider === undefined || !targetCollider.enable) {
                continue;
            }
            for (let it of this.entities) {
                let itCollider = it.collider;
                if (itCollider === undefined || !itCollider.enable || it === target) {
                    continue;
                }
                if (!targetCollider.isCollisionRoughly(itCollider)) {
                    continue;
                }
                if (!targetCollider.isCollision(itCollider, this.collisions[this.collisionSize])) {
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
        Timer.it.stopTimer(`collide`);

        Timer.it.startTimer(`response`);
        // collision response
        let sorted = this.collisions.sort((a, b) => a.py > b.py ? -1 : a.py < b.py ? 1 : 0);
        for (let j = 0; j < this.collisionSize; ++j) {
            let it = sorted[j];
            if (it.e1.collider.isResponse && it.e2.collider.isResponse) {
                this.response.collisionResponse(it, dt);
            }
            it.py = -1000000000;
        }
        Timer.it.stopTimer(`response`);
    }
}
