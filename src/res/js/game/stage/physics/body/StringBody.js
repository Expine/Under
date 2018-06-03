/**
 * String body
 * - Update entity by physical quantity
 * - It can add or remove rigid body
 * - ### Connects all rigid bodies and processes them all together
 * @extends {RigidBody}
 * @implements {IString}
 * @classdesc String body to connect all rigid bodies and process them all together
 */
class StringBody extends RigidBody /* , IString */ { // eslint-disable-line  no-unused-vars
    /**
     * String body constructor
     * @constructor
     * @param {RigidBody} body Original body for delegation
     * @param {number} jointingX Jointing x position
     * @param {number} jointingY Jointing y position
     * @param {number} length Jointing length
     * @param {number} k String power
     * @param {number} count String loop count
     */
    constructor(body, jointingX, jointingY, length, k, count) {
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
         * Jointing x position list
         * @protected
         * @type {Array<number>}
         */
        this.jointingXList = [];
        /**
         * Jointing y position list
         * @protected
         * @type {Array<number>}
         */
        this.jointingYList = [];
        /**
         * Jointing length list
         * @protected
         * @type {Array<number>}
         */
        this.jointingLengthList = [];

        /**
         * Jointing body enable list
         * @protected
         * @type {Array<boolean>}
         */
        this.enableList = [];

        /**
         * String power
         * @protected
         * @type {number}
         */
        this.k = k;
        /**
         * String loop count
         * @protected
         * @type {number}
         */
        this.count = count;

        // initialize
        this.jointingList.push(body);
        this.jointingXList.push(jointingX);
        this.jointingYList.push(jointingY);
        this.jointingLengthList.push(length);
    }

    /**
     * Get horizontal velocity of entity
     * @override
     * @return {number} Horizontal velocity of entity
     */
    get velocityX() {
        return this.body.velocityX;
    }

    /**
     * Get vertical velocity of entityD
     * @override
     * @return {number} Vertical velocity of entityD
     */
    get velocityY() {
        return this.body.velocityY;
    }

    /**
     * Get horizontal acceleration of entity
     * @override
     * @return {number} Horizontal acceleration of entity
     */
    get accelerationX() {
        return this.body.accelerationX;
    }

    /**
     * Get vertical acceleration of entity
     * @override
     * @return {number} Vertical acceleration of entity
     */
    get accelerationY() {
        return this.body.accelerationY;
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
     * Set rigid material
     * @override
     * @param {RigidMaterial} material Rigid material
     */
    setMaterial(material) {
        super.setMaterial(material);
        this.body.setMaterial(material);
    }

    /**
     * Reset rigid body state
     * @override
     */
    reset() {
        super.reset();
        this.body.reset();
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
     * @override
     * @param {number} forceX Force in x direction
     * @param {number} forceY Force in y direction
     */
    enforce(forceX, forceY) {
        this.body.enforce(forceX, forceY);
    }

    /**
     * Initialize body
     * @override
     */
    init() {
        this.body.init();
    }

    /**
     * Prepare for updagte
     * @override
     * @param {number} dt delta time
     */
    prepare() {
        for (let i = 0; i < this.jointingList.length; ++i) {
            const it = this.jointingList[i];
            this.enableList[i] = it.enable;
            it.enable = false;
        }
    }

    /**
     * Update by rigid body
     * @override
     * @param {number} dt delta time
     */
    update(dt) {
        if (!this.enable) {
            return;
        }
        // initialize
        const collisions = [];
        // set constant value
        const listLength = this.jointingLengthList.length;
        const milisec = dt / 1000;
        const milisec2 = milisec * milisec;
        const elim = 1;
        // generate element
        const world = this.entity.stage.getPhysicalWorld();
        // generate list
        const dxList = new Array(listLength);
        const dyList = new Array(listLength);
        const willXList = [];
        willXList.push(new Array(listLength));
        willXList.push(new Array(listLength));
        const willYList = [];
        willYList.push(new Array(listLength));
        willYList.push(new Array(listLength));
        const pxList = new Array(listLength);
        const pyList = new Array(listLength);
        const movedList = new Array(listLength);
        const xRepulsionList = new Array(listLength);
        const yRepulsionList = new Array(listLength);
        // initialize
        for (let i = 0; i < listLength; ++i) {
            const it = this.jointingList[i];
            // update information
            if (this.enableList[i]) {
                it.updateInfo(dt);
                it.updateVelocity(dt);
                it.updateEntity(dt);
            }
            // initialize list
            dxList[i] = it.entity.directionX >= 0 ? this.jointingXList[i] : it.entity.width - this.jointingXList[i];
            dyList[i] = it.entity.directionY >= 0 ? this.jointingYList[i] : it.entity.height - this.jointingYList[i];
            willXList[1][i] = it.entity.x + dxList[i];
            willYList[1][i] = it.entity.y + dyList[i];
            pxList[i] = 0;
            pyList[i] = 0;
            xRepulsionList[i] = false;
            yRepulsionList[i] = false;
            // check collision
            if (this.enableList[i]) {
                const data = world.getCollisionData(it.entity.collider);
                for (const col of data) {
                    if (!col.colliding.collider.isResponse(col.collided.collider) || !col.collided.collider.isResponse(col.colliding.collider)) {
                        continue;
                    }
                    // push back
                    willXList[1][i] -= col.nx * col.depth;
                    willYList[1][i] -= col.ny * col.depth;
                    // repulsion
                    if (it.velocityX * col.nx + it.velocityY * col.ny > 0) {
                        if (!xRepulsionList[i]) {
                            pxList[i] -= col.nx * it.entity.material.mass * Math.abs(it.velocityX) / milisec / 2;
                            xRepulsionList[i] = col.nx !== 0;
                        }
                        if (!yRepulsionList[i]) {
                            pyList[i] -= col.ny * it.entity.material.mass * Math.abs(it.velocityY) / milisec / 2;
                            yRepulsionList[i] = col.ny !== 0;
                        }
                    }
                    collisions.push(col);
                }
                // correct
                it.entity.deltaMove(willXList[1][i] - it.entity.x - dxList[i], willYList[1][i] - it.entity.y - dyList[i]);
            }
            // decide position
            willXList[0][i] = willXList[1][i];
            willYList[0][i] = willYList[1][i];
        }
        // repeat move
        let isLoop = true;
        for (let count = 0; count < this.count && isLoop; count += listLength) {
            isLoop = false;
            for (let i = 0; i < listLength - 1; ++i) {
                // check length
                const length = this.jointingLengthList[i + 1] + this.jointingLengthList[i];
                const dx = willXList[0][i + 1] - willXList[0][i];
                const dy = willYList[0][i + 1] - willYList[0][i];
                const d2 = dx * dx + dy * dy;
                if ((d2 - length * length) < elim || d2 === 0) {
                    continue;
                }
                // set power
                const m1 = this.jointingList[i].entity.material.mass;
                const m2 = this.jointingList[i + 1].entity.material.mass;
                const d = Math.sqrt(d2);
                const power = (d - length) * this.k;
                const px = power * dx / d;
                const py = power * dy / d;
                // move by power
                if (this.enableList[i]) {
                    willXList[1][i] += px * milisec2 / m1;
                    willYList[1][i] += py * milisec2 / m1;
                    movedList[i] = true;
                }
                if (this.enableList[i + 1]) {
                    willXList[1][i + 1] -= px * milisec2 / m2;
                    willYList[1][i + 1] -= py * milisec2 / m2;
                    movedList[i + 1] = true;
                }
                // register force
                pxList[i] += px;
                pyList[i] += py;
                pxList[i + 1] -= px;
                pyList[i + 1] -= py;
                // set moved
                isLoop = true;
            }
            // move and check collision
            for (let i = 0; i < listLength; ++i) {
                if (movedList[i]) {
                    const it = this.jointingList[i];
                    // move
                    it.entity.deltaMove(willXList[1][i] - it.entity.x - dxList[i], willYList[1][i] - it.entity.y - dyList[i]);
                    // check collision
                    const data = world.getCollisionData(it.entity.collider);
                    for (const col of data) {
                        if (!col.colliding.collider.isResponse(col.collided.collider) || !col.collided.collider.isResponse(col.colliding.collider)) {
                            continue;
                        }
                        // push back
                        willXList[1][i] -= col.nx * col.depth;
                        willYList[1][i] -= col.ny * col.depth;
                        // repulsion
                        if (it.velocityX * col.nx + it.velocityY * col.ny > 0) {
                            if (!xRepulsionList[i]) {
                                pxList[i] -= col.nx * it.entity.material.mass * Math.abs(it.velocityX) / milisec / 2;
                                xRepulsionList[i] = col.nx !== 0;
                            }
                            if (!yRepulsionList[i]) {
                                pyList[i] -= col.ny * it.entity.material.mass * Math.abs(it.velocityY) / milisec / 2;
                                yRepulsionList[i] = col.ny !== 0;
                            }
                        }
                        collisions.push(col);
                    }
                    // decide position
                    willXList[0][i] = willXList[1][i];
                    willYList[0][i] = willYList[1][i];
                }
                movedList[i] = false;
            }
        }
        // cleaunp and update velocity
        for (let i = 0; i < listLength; ++i) {
            const it = this.jointingList[i];
            it.cleanup(dt);
            if (this.enableList[i]) {
                it.enforce(pxList[i], pyList[i]);
                it.updateVelocity(dt);
                it.cleanup(dt);
            }
            // clear collision data
            it.entity.collider.clear();
        }
        // update collision data
        for (let i = collisions.length - 1; i >= 0; --i) {
            const it = collisions[i];
            if (!it.colliding.collider.collisions.find((t) => Util.getCollidedEntity(it.colliding, t) === it.collided)) {
                it.colliding.collider.addCollision(it);
                it.collided.collider.addCollision(it);
            }
        }
    }

    /**
     * Cleanup body information
     * @override
     * @param {nuumber} dt Delta time
     */
    cleanup(dt) {
        for (let i = 0; i < this.jointingList.length; ++i) {
            const it = this.jointingList[i];
            it.enable = this.enableList[i];
        }
    }
    /**
     * Get string length
     * @override
     * @return {number} String length
     */
    getLength() {
        return this.jointingLengthList[this.jointingLengthList.length - 1];
    }

    /**
     * Get body list
     * @override
     * @return {Array<RigidBody>} Body list
     */
    getBodies() {
        return this.jointingList;
    }

    /**
     * Add entity for string
     * @override
     * @param {RigidBody} jointing Jointing body
     * @param {number} jointingX Jointing x position
     * @param {number} jointingY Jointing y position
     * @param {number} length Jointing length
     */
    addBody(jointing, jointingX, jointingY, length) {
        this.jointingList.push(jointing);
        this.jointingXList.push(jointingX);
        this.jointingYList.push(jointingY);
        this.jointingLengthList.push(length);
        this.enableList.push(jointing.enable);
    }

    /**
     * Remove body from string
     * @override
     * @param {RigidBody} body Joiting body
     */
    removeBody(body) {
        const index = this.jointingList.indexOf(body);
        if (index >= 0) {
            this.jointingList.splice(index, 1);
            this.jointingXList.splice(index, 1);
            this.jointingYList.splice(index, 1);
            this.jointingLengthList.splice(index, 1);
            this.enableList.splice(index, 1);
        }
    }
}
