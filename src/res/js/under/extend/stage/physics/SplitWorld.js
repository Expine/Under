/**
 * Split world
 * - Performs a physical operation
 * - Registers entities and apply a physical operation
 * - Continually perform collision processing
 * - ### Manages not actor by split area
 * @extends {SequentialWorld}
 * @classdesc Split world to manage not actor by split area
 */
class SplitWorld extends SequentialWorld { // eslint-disable-line  no-unused-vars
    /**
     * Split world constructor
     * @constructor
     * @param {number} stageWidth Stage width (pixel)
     * @param {number} stageHeight Stage height (pixel)
     * @param {number} [gravity=9.8] gravity of the world
     * @param {number} [splitNumber=128] One unit of division
     */
    constructor(stageWidth, stageHeight, gravity = 9.8, splitNumber = 128) {
        super(gravity);

        /**
         * One unit of division
         * @protected
         * @type {number}
         */
        this.splitNumber = splitNumber;

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

        /**
         * List of list of entities that exist in each division unit
         * @protected
         * @type {Array<Array<InfluentialEntity>>}
         */
        this.notActorsMap = [];

        // initialize
        for (let y = 0; y < this.stageHeight + 1; ++y) {
            for (let x = 0; x < this.stageWidth + 1; ++x) {
                this.notActorsMap.push([]);
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
        if (entity instanceof MutableEntity) {
            this.actors.push(entity);
        } else {
            let sx = Math.floor(entity.collider.aabb.startX / this.splitNumber);
            let sy = Math.floor(entity.collider.aabb.startY / this.splitNumber);
            let ex = Math.floor(entity.collider.aabb.endX / this.splitNumber);
            let ey = Math.floor(entity.collider.aabb.endY / this.splitNumber);
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
            let sx = Math.floor(entity.collider.aabb.startX / this.splitNumber);
            let sy = Math.floor(entity.collider.aabb.startY / this.splitNumber);
            let ex = Math.floor(entity.collider.aabb.endX / this.splitNumber);
            let ey = Math.floor(entity.collider.aabb.endY / this.splitNumber);
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
     * @param {Collider} collider Target collider
     * @return {Array<CollisionData>} Collision information now
     */
    getCollisionData(collider) {
        let ret = [];
        if (collider === null) {
            return ret;
        }
        // check region
        let sx = Math.floor(collider.aabb.startX / this.splitNumber);
        let sy = Math.floor(collider.aabb.startY / this.splitNumber);
        let ex = Math.floor(collider.aabb.endX / this.splitNumber);
        let ey = Math.floor(collider.aabb.endY / this.splitNumber);
        if (ex < 0 || ey < 0 || sx >= this.stageWidth || sy >= this.stageHeight) {
            return ret;
        }
        if (sx < 0) {
            sx = 0;
        }
        if (sy < 0) {
            sy = 0;
        }
        let collidedList = [];
        let data = new LowerPriorityData();
        for (let it of this.actors) {
            let itCollider = it.collider;
            if (itCollider === null || it === collider.entity || !itCollider.enable) {
                continue;
            }
            if (collider.isCollisionRoughly(itCollider) && collider.isCollision(itCollider, data)) {
                ret.push(data);
                data = new LowerPriorityData();
            }
        }
        for (let y = sy; y <= ey; ++y) {
            for (let x = sx; x <= ex; ++x) {
                for (let it of this.notActorsMap[x + this.stageWidth * y]) {
                    let itCollider = it.collider;
                    if (itCollider === null || !itCollider.enable) {
                        continue;
                    }
                    if (collidedList.indexOf(it) != -1) {
                        continue;
                    }
                    if (collider.isCollisionRoughly(itCollider) && collider.isCollision(itCollider, data)) {
                        collidedList.push(it);
                        ret.push(data);
                        data = new LowerPriorityData();
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
        // collision detection
        for (let i = 0; i < this.actors.length; ++i) {
            let target = this.actors[i];
            let targetCollider = target.collider;
            if (targetCollider === null || !targetCollider.enable) {
                continue;
            }
            let sx = Math.floor(targetCollider.aabb.startX / this.splitNumber);
            let sy = Math.floor(targetCollider.aabb.startY / this.splitNumber);
            let ex = Math.floor(targetCollider.aabb.endX / this.splitNumber);
            let ey = Math.floor(targetCollider.aabb.endY / this.splitNumber);
            if (ex < 0 || ey < 0 || sx >= this.stageWidth || sy >= this.stageHeight) {
                continue;
            }
            if (sx < 0) {
                sx = 0;
            }
            if (sy < 0) {
                sy = 0;
            }
            let collidedList = [];
            for (let j = i + 1; j < this.actors.length; ++j) {
                let it = this.actors[j];
                let itCollider = it.collider;
                if (itCollider === null || !itCollider.enable || !targetCollider.isCollisionRoughly(itCollider) || !targetCollider.isCollision(itCollider, this.collisions[this.collisionSize])) {
                    continue;
                }
                // add collision data
                targetCollider.addCollision(this.collisions[this.collisionSize]);
                itCollider.addCollision(this.collisions[this.collisionSize]);
                if (++this.collisionSize >= this.collisions.length) {
                    this.collisions.push(new LowerPriorityData());
                }
            }
            for (let y = sy; y <= ey; ++y) {
                for (let x = sx; x <= ex; ++x) {
                    for (let it of this.notActorsMap[x + this.stageWidth * y]) {
                        let itCollider = it.collider;
                        if (itCollider === null || !itCollider.enable || collidedList.indexOf(it) != -1 || !targetCollider.isCollisionRoughly(itCollider) || !targetCollider.isCollision(itCollider, this.collisions[this.collisionSize])) {
                            continue;
                        }
                        // add collision data
                        collidedList.push(it);
                        targetCollider.addCollision(this.collisions[this.collisionSize]);
                        itCollider.addCollision(this.collisions[this.collisionSize]);
                        if (++this.collisionSize >= this.collisions.length) {
                            this.collisions.push(new LowerPriorityData());
                        }
                    }
                }
            }
        }
    }
}
