/**
 * @implements {PhysicalWorld}
 * @classdesc
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
        this.collisions.push(new CollisionData(null, null, 0, 0, 0));

        /**
         * Size of collision data list
         * @protected
         * @type {number}
         */
        this.collisionSize = 0;

        /**
         * Collision response instance
         * @protected
         * @type {CollisionResponse}
         */
        this.response = new Repulsion();
    }

    /**
     * Update physical world
     * @param {number} dt Delta time
     * @param {Array<Entity>} targets List of targets to which physical operation is applied
     * @param {IteratableObject<Entity>} entities List of all entity
     */
    update(dt, targets, entities) {
        // body update
        for (let target of targets) {
            if (target.body !== undefined) {
                target.body.enforce(0, this.gravity * target.material.mass);
                target.body.update(dt);
            }
        }

        // collision detection
        this.collisionSize = 0;
        for (let it of entities) {
            if (it.collider !== undefined) {
                it.collider.init();
            }
        }
        for (let target of targets) {
            let targetCollider = target.collider;
            if (targetCollider !== undefined && targetCollider.enable) {
                for (let it of entities) {
                    let itCollider = it.collider;
                    if (itCollider !== undefined && itCollider.enable && targetCollider.isCollisionRoughly(itCollider) && it !== target) {
                        if (targetCollider.isCollision(itCollider, dt, this.collisions[this.collisionSize])) {
                            let same = false;
                            for (var j = 0; j < this.collisionSize; ++j) {
                                let data = this.collisions[j];
                                if ((data.e1 === target && data.e2 === it) || (data.e2 === target && data.e1 === it)) {
                                    same = true;
                                    break;
                                }
                            }
                            if (same) {
                                continue;
                            }
                            targetCollider.addCollision(this.collisions[this.collisionSize]);
                            itCollider.addCollision(this.collisions[this.collisionSize]);
                            if (++this.collisionSize >= this.collisions.length) {
                                this.collisions.push(new CollisionData(null, null, 0, 0, 0));
                            }
                        }
                    }
                }
            }
        }

        // collision response
        for (var j = 0; j < this.collisionSize; ++j) {
            let it = this.collisions[j];
            if (it.e1.collider.isResponse && it.e2.collider.isResponse) {
                this.response.collisionResponse(it, dt);
            }
        }
    }
}
