import { PhysicalWorld } from "../../../base/stage/physics/PhysicalWorld";
import { MutableEntity } from "../../../base/stage/entity/MutableEntity";
import { CollisionData } from "../../../base/stage/physics/collider/CollisionData";
import { InfluentialEntity } from "../../../base/stage/entity/InfluentialEntity";
import { Collider } from "../../../base/stage/physics/collider/Collider";
import { LowerPriorityData } from "./collider/LowerPriorityData";
import { Util } from "../../util/Util";
import { Context } from "../../../base/resources/image/Context";

/**
 * Sequential world
 * - Continually perform collision processing
 * @extends {PhysicalWorld}
 * @classdesc Sequential world to perform collision processing continually
 */
export class SequentialWorld extends PhysicalWorld {
    /**
     * Collision data list
     * @protected
     * @type {Array<CollisionData>}
     */
    protected collisions: Array<CollisionData>;

    /**
     * Collision start index of list
     * @protected
     * @type {number}
     */
    protected collisionStartIndex: number;
    /**
     * Size of collision data list
     * @protected
     * @type {number}
     */
    protected collisionSize: number;

    /**
     * List of entities to act on
     * @protected
     * @type {Array<MutableEntity>}
     */
    protected actors: Array<MutableEntity>;

    /**
     * List of entities not to act on
     * @protected
     * @type {Array<InfluentialEntity>}
     */
    protected notActors: Array<InfluentialEntity>;

    /**
     * List of all entities
     * @protected
     * @type {Array<InfluentialEntity>}
     */
    protected entities: Array<InfluentialEntity>;

    /**
     * Collision target entity list
     * @protected
     * @type {Array<InfluentialEntity>}
     */
    protected collisionTarget: Array<InfluentialEntity>;

    /**
     * Sequential world constructor
     * @constructor
     * @param {number} [gravity=9.8] gravity of the world
     */
    constructor(gravity: number = 9.8) {
        super(gravity);

        this.collisions = [];
        this.collisionStartIndex = 0;
        this.collisionSize = 0;
        this.actors = [];
        this.notActors = [];
        this.entities = [];
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
    addEntity(entity: InfluentialEntity) {
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
    removeEntity(entity: InfluentialEntity) {
        let index = this.entities.indexOf(entity);
        if (index >= 0) {
            this.entities.splice(index, 1);
        }
        if (entity instanceof MutableEntity) {
            index = this.actors.indexOf(entity);
            if (index >= 0) {
                this.actors.splice(index, 1);
            }
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
    getCollisionData(collider: Collider): Array<CollisionData> {
        const ret: Array<CollisionData> = [];
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
    getCollisionSize(): number {
        return this.collisionSize;
    }

    /**
     * Update external force
     * @protected
     * @override
     * @param {number} dt Delta time
     */
    updateExternalForce(_dt: number) {
        for (const target of this.actors) {
            if (target.body !== null && target.body.material !== null && target.material !== null) {
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
    prepareBody(dt: number) {
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
    updateBody(dt: number) {
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
    updateBodyCleanup(dt: number) {
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
    initCollision(_dt: number) {
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
    updateCollision(_dt: number) {
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
    updateResponse(dt: number) {
        if (this.response === null) {
            return;
        }
        this.collisionTarget = [];
        // collision response
        for (let j = this.collisionStartIndex; j < this.collisionSize; ++j) {
            const it = this.collisions[j];
            if (it.colliding.collider !== null && it.collided.collider !== null && it.colliding.collider.isResponse(it.collided.collider) && it.collided.collider.isResponse(it.colliding.collider)) {
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
    judgeContinueCollision(_dt: number): boolean {
        let maxDepath = 1;
        for (let j = this.collisionStartIndex; j < this.collisionSize; ++j) {
            maxDepath = Math.max(maxDepath, this.collisions[j].depth);
        }
        this.collisionStartIndex = this.collisionSize;
        return this.collisionTarget.length > 0 && this.collisionSize < 10000 && maxDepath > 1;
    }

    /**
     * Cleanup all information
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    cleanup(_dt: number) { };

    /**
     * Render world
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    render(_ctx: Context, _shiftX: number, _shiftY: number) { }
}
