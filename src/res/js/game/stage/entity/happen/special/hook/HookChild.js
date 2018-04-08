/**
 * Hook child object
 * @implements {HookObject}
 * @classdesc Hook child object
 */
class HookChild extends HookObject { // eslint-disable-line  no-unused-vars
    /**
     * Hook child object constructor
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
        super(x, y, width, height, entity, post, length, restLength);

        // set base data
        this.setCollider(new ExcludedRectangleCollider(0, 0, width, height, 0));
        this.setMaterial(new DefaultMaterial());
        let px = post.directionX >= 0 ? post.getHookX() - post.x - post.width : post.x - post.getHookX();
        let py = post.directionY <= 0 ? post.y - post.getHookY() : post.getHookY() - post.y + post.height;
        this.setRigidBody(new JointBody(this.x - this.getHookX(), this.y - this.getHookY(), post, px, py, length));
        this.addAI(new HookStateAI(this, entity));

        this.x -= (this.getHookX() - this.x);
        this.y -= (this.getHookY() - this.y);
    }

    /**
     * Hook center x position
     * @override
     * @return {number} Hook center x position
     */
    getHookX() {
        return this.x + this.width / 2;
    }

    /**
     * Hook center x position
     * @override
     * @return {number} Hook center x position
     */
    getHookY() {
        return this.y + this.height / 2;
    }

    /**
     * Render entity
     * @override
     * @param {Context} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        // ctx.fillRect(this.x + shiftX, this.y + shiftY, this.width, this.height, `red`, 1);
        if (this.previous !== null) {
            ctx.strokeLine(this.getHookX() + shiftX, this.getHookY() + shiftY, this.previous.getHookX() + shiftX, this.previous.getHookY() + shiftY, `red`, 2);
        } else {
            let x = this.entity.directionX >= 0 ? this.generatedX + this.entity.x + this.entity.width : this.entity.x - this.generatedX;
            let y = this.entity.y - this.generatedY;
            ctx.strokeLine(this.getHookX() + shiftX, this.getHookY() + shiftY, x + shiftX, y + shiftY, `red`, 2);
        }
        super.render(ctx, shiftX, shiftY);
    }
}
