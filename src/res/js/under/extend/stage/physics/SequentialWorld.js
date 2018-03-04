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
        this.response = new ImpulseBased();
    }

    /**
     * Update physical world
     * @param {number} dt Delta time
     * @param {Array<Entity>} targets List of targets to which physical operation is applied
     * @param {IteratableObject<Entity>} entities List of all entity
     */
    update(dt, targets, entities) {
        // switch collision response
        if (Input.it.isNoPress()) {
            if (this.response instanceof ImpulseBased) {
                this.response = new Repulsion();
            } else {
                this.response = new ImpulseBased();
            }
        }

        // loop delta time
        let delta = 1;
        for (var i = 0; i < delta; ++i) {
            // body update
            for (let target of targets) {
                if (target.body !== undefined) {
                    target.body.enforce(0, this.gravity * target.body.mass);
                    target.body.update(dt / delta);
                    if (target.collider !== undefined) {
                        target.collider.init();
                    }
                }
            }

            // collision detection
            this.collisionSize = 0;
            for (let target of targets) {
                if (target.collider !== undefined) {
                    for (let it of entities) {
                        if (it.collider !== undefined && target.collider.isCollisionRoughly(it.collider) && it !== target) {
                            if (target.collider.isCollision(it.collider, this.collisions[this.collisionSize])) {
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
                this.response.collisionResponse(this.collisions[j], dt / delta);
            }
        }
    }
}
