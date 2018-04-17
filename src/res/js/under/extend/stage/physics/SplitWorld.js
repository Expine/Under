/**
 * Split world
 * - Performs a physical operation
 * - Registers entities and apply a physical operation
 * - Continually perform collision processing
 * - ### Manages not actor by split area
 * @implements {SequentialWorld}
 * @classdesc Split world to manage not actor by split area
 */
class SplitWorld extends SequentialWorld { // eslint-disable-line  no-unused-vars
    /**
     * Split world constructor
     * @constructor
     * @param {number} stageWidth Stage width (pixel)
     * @param {number} stageHeight Stage height (pixel)
     * @param {number} [gravity=9.8] gravity of the world
     */
    constructor(stageWidth, stageHeight, gravity = 9.8) {
        super(gravity);

        this.splitNumber = 128;

        /**
         * Stage width (area)
         * @protected
         * @type {number}
         */
        this.stageWidth = Math.floor(stageWidth / this.splitNumber) + ((stageWidth % this.splitNumber == 0) ? 0 : 1);
        /**
         * Stage height (area)
         * @protected
         * @type {number}
         */
        this.stageHeight = Math.floor(stageHeight / this.splitNumber) + ((stageHeight % this.splitNumber == 0) ? 0 : 1);

        this.notActorsMap = [];

        // initialize
        for (let y = 0; y < this.stageHeight + 1; ++y) {
            for (let x = 0; x < this.stageWidth + 1; ++x) {
                this.notActorsMap.push([]);
            }
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
            let sx = Math.floor(actor.x / this.splitNumber);
            let sy = Math.floor(actor.y / this.splitNumber);
            let ex = Math.floor((actor.x + actor.width) / this.splitNumber);
            let ey = Math.floor((actor.y + actor.height) / this.splitNumber);
            for (let y = sy; y <= ey; ++y) {
                for (let x = sx; x <= ex; ++x) {
                    this.notActorsMap[x + this.stageWidth * y].splice(this.notActorsMap[x + this.stageWidth * y].indexOf(actor), 1);
                }
            }
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
            let sx = Math.floor(entity.x / this.splitNumber);
            let sy = Math.floor(entity.y / this.splitNumber);
            let ex = Math.floor((entity.x + entity.width) / this.splitNumber);
            let ey = Math.floor((entity.y + entity.height) / this.splitNumber);
            for (let y = sy; y <= ey; ++y) {
                for (let x = sx; x <= ex; ++x) {
                    this.notActorsMap[x + this.stageWidth * y].push(entity);
                }
            }
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
            let sx = Math.floor(entity.x / this.splitNumber);
            let sy = Math.floor(entity.y / this.splitNumber);
            let ex = Math.floor((entity.x + entity.width) / this.splitNumber);
            let ey = Math.floor((entity.y + entity.height) / this.splitNumber);
            for (let y = sy; y <= ey; ++y) {
                for (let x = sx; x <= ex; ++x) {
                    this.notActorsMap[x + this.stageWidth * y].splice(this.notActorsMap[x + this.stageWidth * y].indexOf(entity), 1);
                }
            }
        }
    }

    /**
     * Get collision information now
     * @override
     * @param {InfluentialEntity} entity Target entity
     * @return {Array<CollisionData>} Collision information now
     */
    getCollisionData(entity) {
        let ret = [];
        if (entity.collider === null) {
            return ret;
        }
        let data = new CollisionData();
        /*
        for (let it of this.actors) {
            let itCollider = it.collider;
            if (itCollider === null || it === entity) {
                continue;
            }
            if (entity.collider.isCollisionRoughly(itCollider) && entity.collider.isCollision(itCollider, data)) {
                ret.push(data);
                data = new CollisionData();
            }
        }
        */
        let sx = Math.floor(entity.x / this.splitNumber);
        let sy = Math.floor(entity.y / this.splitNumber);
        let ex = Math.floor((entity.x + entity.width) / this.splitNumber);
        let ey = Math.floor((entity.y + entity.height) / this.splitNumber);
        if (sx < 0 || sy < 0 || ex >= this.stageWidth || ey >= this.stageHeight) {
            return ret;
        }
        for (let y = sy; y <= ey; ++y) {
            for (let x = sx; x <= ex; ++x) {
                for (let it of this.notActorsMap[x + this.stageWidth * y]) {
                    let itCollider = it.collider;
                    if (itCollider === null || it === entity) {
                        continue;
                    }
                    if (entity.collider.isCollisionRoughly(itCollider) && entity.collider.isCollision(itCollider, data)) {
                        ret.push(data);
                        data = new CollisionData();
                    }
                }
            }
        }
        return ret;
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
            let sx = Math.floor(target.x / this.splitNumber);
            let sy = Math.floor(target.y / this.splitNumber);
            let ex = Math.floor((target.x + target.width) / this.splitNumber);
            let ey = Math.floor((target.y + target.height) / this.splitNumber);
            if (sx < 0 || sy < 0 || ex >= this.stageWidth || ey >= this.stageHeight) {
                continue;
            }
            for (let y = sy; y <= ey; ++y) {
                for (let x = sx; x <= ex; ++x) {
                    for (let it of this.notActorsMap[x + this.stageWidth * y]) {
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
        }
    }
}
