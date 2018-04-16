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
     * @param {number} jointingX Jointing x position
     * @param {number} jointingY Jointing y position
     * @param {number} length Jointing length
     */
    constructor(body, jointingX, jointingY, length) {
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
         * String length per unit
         * @protected
         * @type {number}
         */
        this.length = length;

        // initialize
        this.jointingList.push(body);
        this.jointingXList.push(jointingX);
        this.jointingYList.push(jointingY);
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
        let milisec = dt / 1000;
        let milisec2 = milisec * milisec;
        let k = 100;
        let elim = 0.01;
        let l2 = this.length * this.length;
        let xList = new Array(this.jointingList.length);
        let yList = new Array(this.jointingList.length);
        let dxList = new Array(this.jointingList.length);
        let dyList = new Array(this.jointingList.length);
        let vxList = new Array(this.jointingList.length);
        let vyList = new Array(this.jointingList.length);
        let willXList = [];
        willXList.push(new Array(this.jointingList.length));
        willXList.push(new Array(this.jointingList.length));
        let willYList = [];
        willYList.push(new Array(this.jointingList.length));
        willYList.push(new Array(this.jointingList.length));
        let pxList = new Array(this.jointingList.length);
        let pyList = new Array(this.jointingList.length);
        let lenList = new Array(this.jointingList.length);
        let world = this.entity.stage.getPhysicalWorld();
        let response = world.getResponse();
        for (let i = 0; i < this.jointingList.length; ++i) {
            let it = this.jointingList[i];
            it.updateInfo(dt);
            it.updateVelocity(dt);
            let aabb = it.entity.collider.getAABB();
            dxList[i] = it.entity.directionX >= 0 ? this.jointingXList[i] : it.entity.width - this.jointingXList[i];
            dyList[i] = it.entity.directionY > 0 ? this.jointingYList[i] : it.entity.height - this.jointingYList[i];
            xList[i] = it.entity.x + dxList[i];
            yList[i] = it.entity.y + dyList[i];
            vxList[i] = it.velocityX;
            vyList[i] = it.velocityY;
            willXList[0][i] = xList[i] + vxList[i] * milisec;
            willYList[0][i] = yList[i] + vyList[i] * milisec;
            willXList[1][i] = willXList[0][i];
            willYList[1][i] = willYList[0][i];
            pxList[i] = 0;
            pyList[i] = 0;
            let dx = (aabb.startX - aabb.endX) / 2;
            let dy = (aabb.startY - aabb.endY) / 2;
            lenList[i] = Math.sqrt(dx * dx + dy * dy);
        }
        let count = 0;
        let maxd = 0;
        const COUNT = 10000;
        let isLoop = true;
        for (count = 0; count < COUNT && isLoop; ++count) {
            let index = count % 2;
            let will = (index + 1) % 2;
            isLoop = false;
            maxd = 0;
            for (let i = 0; i < this.jointingList.length - 1; ++i) {
                let dx = willXList[index][i + 1] - willXList[index][i];
                let dy = willYList[index][i + 1] - willYList[index][i];
                dx -= Math.sign(dx) * (lenList[i + 1] + lenList[i]);
                dy -= Math.sign(dy) * (lenList[i + 1] + lenList[i]);
                let d2 = dx * dx + dy * dy;
                if (d2 > maxd) {
                    maxd = d2;
                }
                console.log(d2);
                if ((d2 - l2) > elim) {
                    let m1 = this.jointingList[i].entity.material.mass;
                    let m2 = this.jointingList[i + 1].entity.material.mass;
                    let d = Math.sqrt(d2);
                    let power = (d - this.length) * k;
                    let px = power * dx / d;
                    let py = power * dy / d;
                    willXList[will][i] += px * milisec2 / m1;
                    willYList[will][i] += py * milisec2 / m1;
                    pxList[i] += px;
                    pyList[i] += py;
                    willXList[will][i + 1] -= px * milisec2 / m2;
                    willYList[will][i + 1] -= py * milisec2 / m2;
                    pxList[i + 1] -= px;
                    pyList[i + 1] -= py;
                    isLoop = true;
                }
            }
            for (let i = 0; i < this.jointingList.length - 1; ++i) {
                // console.log(`${willXList[index][i + 1]}, ${willYList[index][i + 1]} => ${willXList[will][i + 1]}, ${willYList[will][i + 1]}`);
            }
        }
        if (isLoop) {
            // console.log(`${maxd} - ${Math.sqrt(maxd - l2)} -> ${count}`);
        }
        // console.log(`${maxd} - ${Math.sqrt(maxd - l2)} -> ${count}`);
        for (let i = 0; i < this.jointingList.length; ++i) {
            let it = this.jointingList[i];
            it.cleanup(dt);
            /*
            console.log(`F${pxList[i] / 10}, ${pyList[i] / 10}`);
            console.log(`dV${pxList[i] / 10 * milisec2}, ${pyList[i] / 10 * milisec2}`);
            console.log(`P${xList[i]} -> ${willXList[i]}, ${yList[i]} -> ${willYList[i]}`);
            console.log(`V${vxList[i]} -> ${vxList[i] + pxList[i] / 10 * milisec}, ${vyList[i]} -> ${vyList[i] + pyList[i] / 10 * milisec}`);
            */
            it.enforce(pxList[i], pyList[i]);
            it.updateVelocity(dt);
            it.updateEntity(dt);
            it.cleanup(dt);
            // it.entity.deltaMove(willXList[i] - dxList[i] - it.entity.x, willYList[i] - dyList[i] - it.entity.y);
            it.enforce((milisec - 1) * pxList[i], (milisec - 1) * pyList[i]);
            it.updateVelocity(dt);
            it.cleanup(dt);
        }
        /*
        for (let body of this.jointingList) {
            let data = world.getCollisionData(body.entity);
            for (let it of data) {
                response.collisionResponse(it, dt / COUNT);
            }
        }
        */
    }

    /**
     * Cleanup body information
     * @interface
     * @param {nuumber} dt Delta time
     */
    cleanup(dt) {
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
    addBody(jointing, jointingX, jointingY) {
        this.jointingList.push(jointing);
        this.jointingXList.push(jointingX);
        this.jointingYList.push(jointingY);
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
            this.jointingXList.splice(index, 1);
            this.jointingYList.splice(index, 1);
        }
        body.enable = true;
    }
}
