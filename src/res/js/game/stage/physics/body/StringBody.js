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
         * Jointing length list
         * @protected
         * @type {Array<number>}
         */
        this.jointingLengthList = [];

        // initialize
        this.jointingList.push(body);
        this.jointingXList.push(jointingX);
        this.jointingYList.push(jointingY);
        this.jointingLengthList.push(length);
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
        // set constant value
        const listLength = this.jointingLengthList.length;
        const milisec = dt / 1000;
        const milisec2 = milisec * milisec;
        const k = 2000;
        const elim = 0.75;
        // generate element
        let world = this.entity.stage.getPhysicalWorld();
        let response = world.getResponse();
        // generate list
        let dxList = new Array(listLength);
        let dyList = new Array(listLength);
        let willXList = [];
        willXList.push(new Array(listLength));
        willXList.push(new Array(listLength));
        let willYList = [];
        willYList.push(new Array(listLength));
        willYList.push(new Array(listLength));
        let pxList = new Array(listLength);
        let pyList = new Array(listLength);
        // initialize
        for (let i = 0; i < listLength; ++i) {
            let it = this.jointingList[i];
            // update information
            it.updateInfo(dt);
            it.updateVelocity(dt);
            // initialize list
            dxList[i] = it.entity.directionX >= 0 ? this.jointingXList[i] : it.entity.width - this.jointingXList[i];
            dyList[i] = it.entity.directionY > 0 ? this.jointingYList[i] : it.entity.height - this.jointingYList[i];
            willXList[1][i] = it.entity.x + dxList[i] + it.velocityX * milisec;
            willYList[1][i] = it.entity.y + dyList[i] + it.velocityY * milisec;
            // initial enforce
            if (i > 0) {
                let length = this.jointingLengthList[i - 1] + this.jointingLengthList[i];
                let dx = willXList[1][i - 1] - willXList[1][i];
                let dy = willYList[1][i - 1] - willYList[1][i];
                let d2 = dx * dx + dy * dy;
                let d = Math.sqrt(d2);
                let power = (d - length) * k;
                let px = power * dx / d;
                let py = power * dy / d;
                pxList[i - 1] -= px;
                pyList[i - 1] -= py;
                pxList[i] = px;
                pyList[i] = py;
            } else {
                pxList[i] = 0;
                pyList[i] = 0;
            }
            // initial move
            it.entity.deltaMove(willXList[1][i] - it.entity.x - dxList[i], willYList[1][i] - it.entity.y - dyList[i]);
            // check collision
            let data = world.getCollisionData(it.entity);
            for (let col of data) {
                willXList[1][i] -= col.nx * col.depth;
                willYList[1][i] -= col.ny * col.depth;
            }
            // decide position
            willXList[0][i] = willXList[1][i];
            willYList[0][i] = willYList[1][i];
        }
        let count = 0;
        const COUNT = 10000;
        let isLoop = true;
        for (count = 0; count < COUNT && isLoop; ++count) {
            isLoop = false;
            for (let i = 0; i < listLength - 1; ++i) {
                let length = this.jointingLengthList[i + 1] + this.jointingLengthList[i];
                let dx = willXList[0][i + 1] - willXList[0][i];
                let dy = willYList[0][i + 1] - willYList[0][i];
                let d2 = dx * dx + dy * dy;
                if (Math.abs(d2 - length * length) < elim) {
                    continue;
                }
                let m1 = this.jointingList[i].entity.material.mass;
                let m2 = this.jointingList[i + 1].entity.material.mass;
                let d = Math.sqrt(d2);
                let power = (d - length) * k;
                let px = power * dx / d;
                let py = power * dy / d;
                willXList[1][i] += px * milisec2 / m1;
                willYList[1][i] += py * milisec2 / m1;
                willXList[1][i + 1] -= px * milisec2 / m2;
                willYList[1][i + 1] -= py * milisec2 / m2;
                isLoop = true;
            }
            for (let i = 0; i < listLength; ++i) {
                let it = this.jointingList[i];
                it.entity.deltaMove(willXList[1][i] - it.entity.x - dxList[i], willYList[1][i] - it.entity.y - dyList[i]);
                let data = world.getCollisionData(it.entity);
                for (let col of data) {
                    willXList[1][i] -= col.nx * col.depth;
                    willYList[1][i] -= col.ny * col.depth;
                }
                willXList[0][i] = willXList[1][i];
                willYList[0][i] = willYList[1][i];
            }
        }
        if (isLoop) {
            let maxd = 0;
            for (let i = 0; i < listLength - 1; ++i) {
                let length = this.jointingLengthList[i + 1] + this.jointingLengthList[i];
                let dx = willXList[1][i + 1] - willXList[1][i];
                let dy = willYList[1][i + 1] - willYList[1][i];
                let d2 = dx * dx + dy * dy;
                if (Math.abs(d2 - length * length) < elim) {
                    continue;
                }
                let d = Math.sqrt(d2);
                maxd = Math.max(d, maxd);
            }
            console.log(`${maxd} -> ${count}`);
        }
        for (let i = 0; i < this.jointingList.length; ++i) {
            let it = this.jointingList[i];
            it.cleanup(dt);
            // console.log(`${pxList[i]}, ${pyList[i]}`);
            it.enforce(pxList[i], pyList[i]);
            it.updateVelocity(dt);
            it.cleanup(dt);
        }
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
        return this.jointingLengthList[0];
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
            this.jointingLengthList.splice(index, 1);
        }
        body.enable = true;
    }
}
