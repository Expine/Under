/**
 * Hook object
 * Base object of hook
 * @implements {SpecialObject}
 * @implements {Hookable}
 * @classdesc Hook object that indicates base object of hook
 */
class HookObject extends SpecialObject /* , Hookable */ { // eslint-disable-line  no-unused-vars
    /**
     * Hook object constructor
     * @constructor
     * @param {number} x x position
     * @param {number} y y position
     * @param {number} width object width
     * @param {number} height object height
     * @param {Entity} entity Attacker entity
     * @param {Entity : Hookable} post Post entity
     * @param {number} length Hook length
     * @param {number} restLength Hook rest length
     */
    constructor(x, y, width, height, entity, post, length, restLength) {
        super(x, y, width, height, entity, -1);

        /**
         * Previous entity
         * @protected
         * @type {Entity : Hookable}
         */
        this.previous = null;
        /**
         * Post entity
         * @protected
         * @type {Entity : Hookable}
         */
        this.post = post;

        /**
         * Hook length
         * @protected
         * @type {number}
         */
        this.length = length;

        /**
         * Hook rest length
         * @protected
         * @type {number}
         */
        this.restLength = restLength;

        /**
         * Generated x position
         * @protected
         * @type {number}
         */
        this.generatedX = entity.directionX >= 0 ? x - entity.width - entity.x : entity.x - x;
        /**
         * Generated y position
         * @protected
         * @type {number}
         */
        this.generatedY = entity.y - y;

        /**
         * Whether it is hooked or not
         * @protected
         * @type {bool}
         */
        this.isHooked = false;

        if (this.restLength < 0) {
            this.hooked();
        }
    }


    /**
     * Get actor who it belongs to
     * @override
     * @return {Entity} Actor who it belongs to
     */
    getActor() {
        return this.entity;
    }

    /**
     * Get hook length
     * @override
     * @return {number} Hook length
     */
    getLength() {
        return this.length;
    }

    /**
     * Get previous entity
     * @override
     * @return {Hookable} Previous entity
     */
    getPrevious() {
        return this.previous;
    }

    /**
     * Hooked hook
     * @override
     */
    hooked() {
        if (this.previous !== null) {
            this.previous.hooked();
        } else {
            let x = this.entity.directionX >= 0 ? this.generatedX + this.entity.x + this.entity.width : this.entity.x - this.generatedX;
            let y = this.entity.y - this.generatedY;
            this.previous = new HookPlayer(x, y, 8, 8, this.entity, this, this.length, this.restLength - 15);
        }
        this.isHooked = true;
    }

    /**
     * Release hook
     * @override
     */
    release() {
        for (let it of this.ai) {
            if (it instanceof StateAI) {
                it.changeState(`released`);
            }
        }
    }

    /**
     * Enforce tension
     * @param {number} x Tension of x
     * @param {number} y Tension of y
     * @param {number} dt Delta time
     */
    tension(x, y, dt) {
        this.body.enforce(x * 5000 / dt, y * 5000 / dt);
        // this.body.setNextAddVelocity(x * 1000 / dt - this.body.preVelocityX, y * 1000 / dt - this.body.preVelocityY);
        // this.body.setNextAddVelocity(x * 1000 / dt - this.body.preVelocityX, y * 1000 / dt - this.body.preVelocityY);
    }

    /**
     * Destroy object
     * @override
     */
    destroy() {
        if (BaseUtil.implementsOf(this.previous, Breakable)) {
            this.previous.destroy();
        }
        super.destroy();
    }

    /**
     * Update object
     * @override
     * @param {number} dt - delta time
     */
    update(dt) {
        super.update(dt);

        if (this.previous === null && this.restLength > 0 && !this.isHooked) {
            let x = this.entity.directionX >= 0 ? this.generatedX + this.entity.x + this.entity.width : this.entity.x - this.generatedX;
            let y = this.entity.y - this.generatedY;
            let dx = Math.abs(x - this.getHookX());
            let dy = Math.abs(y - this.getHookY());
            let d = Math.sqrt(dx * dx + dy * dy);
            if (d > this.length) {
                this.previous = new HookChild(x, y, 4, 4, this.entity, this, this.length, this.restLength - 15);
                this.stage.addEntity(this.previous);
                this.previous.body.update(dt);
            }
        }
    }
}
